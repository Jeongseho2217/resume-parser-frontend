import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addCompanyJob } from "../lib/jobs";

function splitCommaValues(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function JobCreatePage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [requirement, setRequirement] = useState("");
  const [preferred, setPreferred] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState("");
  const [desiredProfile, setDesiredProfile] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [preferredSkills, setPreferredSkills] = useState("");
  const [coreCompetencies, setCoreCompetencies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!title.trim() || !company.trim() || !requirement.trim()) {
      setError("공고 제목, 회사명, 자격 요건을 입력하세요.");
      return;
    }

    if (!desiredProfile.trim() || !requiredSkills.trim()) {
      setError("AI 매칭 기준으로 사용할 인재상과 필수 기술스택을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const requiredSkillList = splitCommaValues(requiredSkills);
      const preferredSkillList = splitCommaValues(preferredSkills);
      const competencyList = splitCommaValues(coreCompetencies);

      addCompanyJob({
        title: title.trim(),
        company: company.trim(),
        deadline,
        tasks: tasks
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        requirements: requirement
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        preferred: preferred.trim(),
        desiredProfile: desiredProfile.trim(),
        requiredSkills: requiredSkillList,
        preferredSkills: preferredSkillList,
        coreCompetencies: competencyList,
        tags: [...requiredSkillList, ...competencyList].map((tag) =>
          tag.startsWith("#") ? tag : `#${tag}`
        ),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "공고 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen px-8 py-8">
        <Navbar />

        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">공고 등록 완료</h1>
          <p className="mt-3 text-slate-600">새 채용 공고가 등록되었습니다.</p>

          <button
            onClick={() => navigate("/company/jobs")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            공고 관리로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-8">
      <Navbar />

      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">공고 등록</h1>
        <p className="mt-2 text-sm text-slate-500">
          채용 공고와 AI 매칭 기준을 함께 입력하세요.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              공고 제목
            </label>
            <input
              type="text"
              placeholder="예: 프론트엔드 개발자 모집"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              회사명
            </label>
            <input
              type="text"
              placeholder="회사명을 입력하세요"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              마감일
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              자격 요건
            </label>
            <textarea
              placeholder="담당 업무와 자격 요건을 입력하세요"
              rows="7"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              주요 업무
            </label>
            <textarea
              placeholder={"한 줄에 하나씩 입력하세요\n예: React 기반 서비스 화면 개발"}
              rows="5"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              우대 사항
            </label>
            <textarea
              placeholder="우대 사항이 있다면 입력하세요"
              rows="4"
              value={preferred}
              onChange={(e) => setPreferred(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">AI 매칭 기준</h2>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                바라는 인재상
              </label>
              <textarea
                placeholder="예: React 기반 제품 개발 경험이 있고, 협업과 문제 해결 능력이 좋은 지원자"
                rows="4"
                value={desiredProfile}
                onChange={(e) => setDesiredProfile(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                필수 기술스택
              </label>
              <input
                type="text"
                placeholder="예: React, JavaScript, Git"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                우대 기술스택
              </label>
              <input
                type="text"
                placeholder="예: TypeScript, Next.js, Tailwind CSS"
                value={preferredSkills}
                onChange={(e) => setPreferredSkills(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                핵심 역량
              </label>
              <input
                type="text"
                placeholder="예: 협업, 문제해결능력, 커뮤니케이션"
                value={coreCompetencies}
                onChange={(e) => setCoreCompetencies(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
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
            {loading ? "등록 중..." : "공고 등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
