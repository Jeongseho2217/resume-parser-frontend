import { MOCK_APPLICANTS } from "../data/applicants";
import { SKILL_TAGS } from "./constants";

// .env에 주소가 있으면 진짜 백엔드 사용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
// 공고 id 기본값
const DEFAULT_JOB_ID = import.meta.env.VITE_JOB_ID || "job_123";

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

// 태그 나누기
function splitTags(tags = []) {
  return {
    // 기술 태그만 모으기
    technicalSkills: tags.filter((tag) => !SKILL_TAGS.includes(tag)),
    // 소프트스킬 태그만 모으기
    coreCompetencies: tags.filter((tag) => SKILL_TAGS.includes(tag)),
  };
}

// 목록 카드용 형태
function toCardItem(candidate) {
  // API에서 온 기술 태그
  const technicalSkills = candidate.technical_skills || [];
  // API에서 온 핵심 역량 태그
  const coreCompetencies = candidate.core_competencies || [];

  return {
    id: candidate.resume_id,
    resumeId: candidate.resume_id,
    name: candidate.candidate_name,
    status: candidate.recruitment_status,
    analysisStatus: candidate.status,
    matchingScore: candidate.matching_score,
    technicalSkills,
    coreCompetencies,
    tags: [...technicalSkills, ...coreCompetencies],
    position: candidate.position || "",
    school: candidate.school || "",
    experience: candidate.experience || "",
    summary: Array.isArray(candidate.summary) ? candidate.summary : [],
  };
}

// 상세 모달용 형태
function toDetailItem(baseCandidate, payload) {
  // 실패면 실패 상태 그대로 반환
  if (payload.status === "FAILED") {
    return {
      status: "FAILED",
      message: payload.message || "상세 정보를 불러오지 못했습니다.",
      analysisResult: null,
    };
  }

  // 아직 분석 중이면 비어 있는 상태로 반환
  if (payload.status === "PENDING") {
    return {
      status: "PENDING",
      analysisResult: null,
    };
  }

  // 분석 끝난 결과 꺼내기
  const result = payload.analysis_result || {};
  const technicalSkills = result.technical_skills || baseCandidate.technicalSkills || [];
  const coreCompetencies =
    result.core_competencies || baseCandidate.coreCompetencies || [];

  return {
    status: "DONE",
    analysisResult: {
      // 카드에서 이미 알고 있던 값도 같이 들고 가기
      ...baseCandidate,
      candidateDate: payload.candidate_date || "",
      matchingScore: result.matching_score ?? baseCandidate.matchingScore ?? 0,
      technicalSkills,
      coreCompetencies,
      tags: [...technicalSkills, ...coreCompetencies],
      summary: result.summary || [],
      resume: result.content || "",
    },
  };
}

async function request(path) {
  // 실제 서버에 요청 보내기
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  // json으로 바꿔서 돌려주기
  return response.json();
}

export async function fetchCandidates({ jobId = DEFAULT_JOB_ID, hashtag, page = 1 }) {
  if (!API_BASE_URL) {
    // 백엔드 없을 때 목업 사용
    await wait(300);

    // 태그가 있으면 그 태그만 남기기
    const filtered = MOCK_APPLICANTS.filter((candidate) => {
      if (!hashtag) return true;
      return candidate.tags.includes(hashtag);
    }).sort((a, b) => b.matchingScore - a.matchingScore);

    return {
      // 페이지 정보 흉내내기
      pageInfo: {
        currentPage: page,
        pageSize: 10,
        totalPages: Math.max(1, Math.ceil(filtered.length / 10)),
        totalCount: filtered.length,
      },
      // 카드에 맞는 형태로 바꾸기
      candidates: filtered.slice((page - 1) * 10, page * 10).map((candidate) => {
        const { technicalSkills, coreCompetencies } = splitTags(candidate.tags);

        return {
          id: String(candidate.id),
          resumeId: String(candidate.id),
          name: candidate.name,
          status: candidate.status,
          analysisStatus: "DONE",
          matchingScore: candidate.matchingScore,
          technicalSkills,
          coreCompetencies,
          tags: candidate.tags,
          position: candidate.position,
          school: candidate.school,
          experience: candidate.experience,
          summary: candidate.summary,
        };
      }),
    };
  }

  // 실제 API에 보낼 쿼리 만들기
  const searchParams = new URLSearchParams({
    job_id: jobId,
    page: String(page),
    page_size: "10",
    sort: "match_score_desc",
  });

  if (hashtag) {
    searchParams.set("hashtag", hashtag);
  }

  // 목록 요청
  const data = await request(`/api/v1/candidates?${searchParams.toString()}`);

  return {
    pageInfo: {
      currentPage: data.page_info?.current_page || 1,
      pageSize: data.page_info?.page_size || 10,
      totalPages: data.page_info?.total_pages || 1,
      totalCount: data.page_info?.total_count || 0,
    },
    candidates: Array.isArray(data.candidates) ? data.candidates.map(toCardItem) : [],
  };
}

export async function fetchCandidateDetail(resumeId, baseCandidate) {
  if (!API_BASE_URL) {
    // 상세도 일단 목업으로
    await wait(500);

    // id가 같은 지원자 찾기
    const candidate = MOCK_APPLICANTS.find((item) => String(item.id) === String(resumeId));

    if (!candidate) {
      return {
        status: "FAILED",
        message: "지원자 상세 정보를 찾을 수 없습니다.",
        analysisResult: null,
      };
    }

    // 목업 태그도 기술/핵심역량으로 나누기
    const { technicalSkills, coreCompetencies } = splitTags(candidate.tags);

    return {
      status: "DONE",
      analysisResult: {
        // 카드 정보 위에 상세 정보 덮어쓰기
        ...baseCandidate,
        candidateDate: `${candidate.appliedAt}T09:00:00+09:00`,
        matchingScore: candidate.matchingScore,
        technicalSkills,
        coreCompetencies,
        tags: candidate.tags,
        summary: candidate.summary,
        resume: candidate.resume,
      },
    };
  }

  // 실제 상세 요청
  const data = await request(`/api/v1/candidates/${resumeId}`);
  return toDetailItem(baseCandidate, data);
}
