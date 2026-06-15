import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { analyzeResume } from "../lib/api";
import { getJobById } from "../lib/jobs";
import { getCurrentUser } from "../lib/auth";
import LoadingOverlay from "../components/LoadingOverlay";

const MAX_TEXT_LENGTH = 1000;

function countWithoutSpaces(value) {
  return value.replace(/\s/g, "").length;
}

export default function ApplyPage() {
  const currentUser = getCurrentUser();
  const [name, setName] = useState(currentUser?.name || "");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [hasExperience, setHasExperience] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [motivation, setMotivation] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectExperience, setProjectExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = getJobById(jobId);

  const motivationCount = countWithoutSpaces(motivation);
  const techStackCount = countWithoutSpaces(techStack);
  const projectExperienceCount = countWithoutSpaces(projectExperience);
  const hasTooLongField =
    motivationCount > MAX_TEXT_LENGTH ||
    techStackCount > MAX_TEXT_LENGTH ||
    projectExperienceCount > MAX_TEXT_LENGTH;

  async function handleSubmit() {
    if (
      !name.trim() ||
      !school.trim() ||
      !major.trim() ||
      !hasExperience ||
      !motivation.trim() ||
      !techStack.trim() ||
      !projectExperience.trim()
    ) {
      setError("이름, 학교, 전공, 경력 여부와 3개 항목을 모두 입력하세요.");
      return;
    }

    if (hasExperience === "유" && !experienceYears.trim()) {
      setError("경력 연차를 입력하세요.");
      return;
    }

    if (hasTooLongField) {
      setError("각 항목은 공백 제외 1000자 이하로 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await analyzeResume(
        jobId,
        name,
        school,
        major,
        hasExperience === "유" ? experienceYears : "0",
        motivation,
        techStack,
        projectExperience
      );
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "지원 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen px-8 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">지원 완료</h1>
          <p className="mt-3 text-slate-600">지원이 완료되었습니다.</p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            공고 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-8">
      {loading && <LoadingOverlay message="AI가 이력서를 분석하고 있습니다..." />}

      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">지원하기</h1>
            <p className="mt-2 text-sm text-slate-500">
              {job ? `${job.company} · ${job.title}` : "아래 정보를 입력하고 이력서를 제출하세요."}
            </p>
          </div>
          <p className="pt-1 text-xs text-slate-400">* 필수 입력 값</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              이름 *
            </label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                학교 *
              </label>
              <input
                type="text"
                placeholder="학교명을 입력하세요"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                전공 *
              </label>
              <input
                type="text"
                placeholder="전공을 입력하세요"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              경력 사항 *
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex rounded-xl border border-slate-300 bg-white p-1">
                {["무", "유"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setHasExperience(value);
                      if (value === "무") {
                        setExperienceYears("");
                      }
                    }}
                    className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                      hasExperience === value
                        ? "bg-blue-600 text-white"
                        : "text-slate-600"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="연차"
                  value={experienceYears}
                  onChange={(e) =>
                    setExperienceYears(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  disabled={hasExperience !== "유"}
                  className="w-24 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                />
                <span className="text-sm text-slate-500">년</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              신입이면 `무`, 경력이 있으면 `유`를 선택하고 연차만 입력
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              지원 동기 *
            </label>
            <textarea
              placeholder="지원 동기를 입력하세요"
              rows="5"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <div className="mt-2 text-right text-xs text-slate-400">
              <span className={motivationCount > MAX_TEXT_LENGTH ? "font-semibold text-rose-500" : ""}>
                공백 제외 {motivationCount}/{MAX_TEXT_LENGTH}자
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              기술 스택 *
            </label>
            <textarea
              placeholder="사용 가능한 기술 스택을 입력하세요"
              rows="4"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <div className="mt-2 text-right text-xs text-slate-400">
              <span className={techStackCount > MAX_TEXT_LENGTH ? "font-semibold text-rose-500" : ""}>
                공백 제외 {techStackCount}/{MAX_TEXT_LENGTH}자
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              프로젝트 경험 *
            </label>
            <textarea
              placeholder="관련 프로젝트 경험을 입력하세요"
              rows="6"
              value={projectExperience}
              onChange={(e) => setProjectExperience(e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <div className="mt-2 text-right text-xs text-slate-400">
              <span
                className={
                  projectExperienceCount > MAX_TEXT_LENGTH
                    ? "font-semibold text-rose-500"
                    : ""
                }
              >
                공백 제외 {projectExperienceCount}/{MAX_TEXT_LENGTH}자
              </span>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "분석 요청 중..." : "제출하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
