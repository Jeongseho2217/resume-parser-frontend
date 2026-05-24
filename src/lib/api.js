import { SKILL_TAGS } from "./constants";

function formatDateTime(dateString) { // 날짜 좀 예쁘게 다듬기
  if (!dateString) return "날짜 정보 없음";
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`; 
}

// 환경변수가 없으면 기본적으로 스프링 부트 포트(8080)를 바라보도록 설정.
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8080";
const DEFAULT_JOB_ID = import.meta.env.VITE_JOB_ID || "1"; // 기본 공고 ID도 진짜 숫자로 변경

function splitTags(tags = []) {
  return {
    technicalSkills: tags.filter((tag) => !SKILL_TAGS.includes(tag)),
    coreCompetencies: tags.filter((tag) => SKILL_TAGS.includes(tag)),
  };
}

function toCardItem(candidate) {
  const technicalSkills = candidate.tech_stacks || candidate.technical_skills || [];
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

function toDetailItem(baseCandidate, payload) {
  if (payload.status === "FAILED") {
    return {
      status: "FAILED",
      message: payload.message || "상세 정보를 불러오지 못했습니다.",
      analysisResult: null,
    };
  }

  if (payload.status === "PENDING") {
    return {
      status: "PENDING",
      analysisResult: null,
    };
  }

  const result = payload.analysis_result || {};
  const technicalSkills =
    result.tech_stacks || result.technical_skills || baseCandidate.technicalSkills || [];
  const coreCompetencies =
    result.core_competencies || baseCandidate.coreCompetencies || [];

  return {
    status: "DONE",
    analysisResult: {
      ...baseCandidate,
      candidateDate: formatDateTime(payload.applied_at), // 날짜 2000-01-01 00:00 꼴로 나오게
      matchingScore: result.matching_score ?? baseCandidate.matchingScore ?? 0,
      technicalSkills,
      coreCompetencies,
      tags: [...technicalSkills, ...coreCompetencies],
      summary: result.summary || [],
      resume: result.content || "",
    },
  };
}

// 공통 통신 함수 (모든 GET, PATCH 요청이 이 함수를 거쳐 안전하게 백엔드로 이동)
async function request(path, options = {}) {
  const { method = "GET", body } = options;

  const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("accessToken")}` // 모든 요청에 토큰 자동 할당
  };

  const fetchOptions = { method, headers };
  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// ── 채용 공고 등록 ─────────────────────────────────────
export async function createJob(recruiterId, title, requirement) {
  const response = await fetch(`${BASE_URL}/api/v1/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({ recruiter_id: recruiterId, title, requirement }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `채용 공고 생성 실패: ${response.status}`);
  }
  return response.json();
}

// ── 자소서 파싱 및 AI 분석 요청 ───────────────────────────
export async function analyzeResume(jobId, candidateName, email, file) {
  const formData = new FormData();
  const cleanJobId = typeof jobId === 'string' ? jobId.replace(/[^0-9]/g, '') : jobId;

  formData.append("job_id", cleanJobId);
  formData.append("name", candidateName);
  formData.append("email", email);
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/api/v1/resumes/analyze`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
  }
  return response.json();
}

// ── 지원자 전형 상태 변경 ──────────────────────────────────
export async function updateCandidateStatus(resumeId, recruitmentStatus) {
  return request(`/api/v1/candidates/${resumeId}/status`, {
    method: "PATCH",
    body: { recruitment_status: recruitmentStatus },
  });
}

// ── 지원자 목록 ───────────────────────────────────────────
export async function fetchCandidates({ jobId = DEFAULT_JOB_ID, hashtag, page = 1 }) {
  const cleanJobId = typeof jobId === 'string' ? jobId.replace(/[^0-9]/g, '') : jobId;
  
  const searchParams = new URLSearchParams({
    job_id: String(cleanJobId),
    page: String(page),
    page_size: "10",
    sort: "match_score_desc",
  });

  if (hashtag) {
    searchParams.set("hashtag", hashtag);
  }

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

// ── 지원자 상세 ───────────────────────────────────────────
export async function fetchCandidateDetail(resumeId, baseCandidate) {
  const data = await request(`/api/v1/candidates/${resumeId}`);
  return toDetailItem(baseCandidate, data);
}