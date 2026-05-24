import { MOCK_APPLICANTS } from "../data/applicants";
import { SKILL_TAGS } from "./constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
const DEFAULT_JOB_ID = import.meta.env.VITE_JOB_ID || "job_123";

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

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
      candidateDate: payload.applied_at || "",
      matchingScore: result.matching_score ?? baseCandidate.matchingScore ?? 0,
      technicalSkills,
      coreCompetencies,
      tags: [...technicalSkills, ...coreCompetencies],
      summary: result.summary || [],
      resume: result.content || "",
    },
  };
}

async function request(path, options = {}) {
  const { method = "GET", body } = options;

  const headers = { "Content-Type": "application/json" };

  const fetchOptions = { method, headers };
  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
  }

  return response.json();
}

// ── 채용 공고 등록 ─────────────────────────────────────
// POST /api/v1/jobs
export async function createJob(recruiterId, title, requirement) {
  if (!API_BASE_URL) {
    await wait(300);
    return {
      job_id: `mock_job_${Date.now()}`,
      message: "채용 공고가 등록되었습니다.",
    };
  }

  return request("/api/v1/jobs", {
    method: "POST",
    body: { recruiter_id: recruiterId, title, requirement },
  });
}

// ── 자소서 파싱 및 AI 분석 요청 ───────────────────────────
// POST /api/v1/resumes/analyze
export async function analyzeResume(jobId, candidateName, resumeText) {
  if (!API_BASE_URL) {
    await wait(500);
    return { resume_id: "mock_resume_id", status: "PENDING" };
  }

  return request("/api/v1/resumes/analyze", {
    method: "POST",
    body: { job_id: jobId, candidate_name: candidateName, resume_text: resumeText },
  });
}

// ── 지원자 전형 상태 변경 ──────────────────────────────────
// PATCH /api/v1/candidates/{resume_id}/status
export async function updateCandidateStatus(resumeId, recruitmentStatus) {
  if (!API_BASE_URL) {
    await wait(300);
    return {};
  }

  return request(`/api/v1/candidates/${resumeId}/status`, {
    method: "PATCH",
    body: { recruitment_status: recruitmentStatus },
  });
}

// ── 지원자 목록 ───────────────────────────────────────────
// GET /api/v1/candidates
export async function fetchCandidates({ jobId = DEFAULT_JOB_ID, hashtag, page = 1 }) {
  if (!API_BASE_URL) {
    await wait(300);

    const filtered = MOCK_APPLICANTS.filter((candidate) => {
      if (!hashtag) return true;
      return candidate.tags.includes(hashtag);
    }).sort((a, b) => b.matchingScore - a.matchingScore);

    return {
      pageInfo: {
        currentPage: page,
        pageSize: 10,
        totalPages: Math.max(1, Math.ceil(filtered.length / 10)),
        totalCount: filtered.length,
      },
      candidates: filtered.slice((page - 1) * 10, page * 10).map((candidate) => {
        const { technicalSkills, coreCompetencies } = splitTags(candidate.tags);

        return {
          id: String(candidate.id),
          resumeId: String(candidate.id),
          name: candidate.name,
          status: candidate.status,
          analysisStatus: candidate.analysisStatus || "DONE",
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

  const searchParams = new URLSearchParams({
    job_id: jobId,
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
// GET /api/v1/candidates/{resume_id}
export async function fetchCandidateDetail(resumeId, baseCandidate) {
  if (!API_BASE_URL) {
    await wait(500);

    const candidate = MOCK_APPLICANTS.find((item) => String(item.id) === String(resumeId));

    if (!candidate) {
      return {
        status: "FAILED",
        message: "지원자 상세 정보를 찾을 수 없습니다.",
        analysisResult: null,
      };
    }

    const { technicalSkills, coreCompetencies } = splitTags(candidate.tags);

    return {
      status: "DONE",
      analysisResult: {
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

  const data = await request(`/api/v1/candidates/${resumeId}`);
  return toDetailItem(baseCandidate, data);
}
