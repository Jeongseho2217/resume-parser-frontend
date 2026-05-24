import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyCompanyJobs, removeCompanyJob } from "../lib/jobs";

export default function CompanyJobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(() => getMyCompanyJobs());
  const [error, setError] = useState("");

  function handleRemove(jobId) {
    const confirmed = window.confirm(
      "정말 이 공고를 삭제하시겠습니까?\n삭제한 공고는 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    try {
      setError("");
      removeCompanyJob(jobId);
      setJobs(getMyCompanyJobs());
    } catch (err) {
      setError(err.message || "공고를 삭제하지 못했습니다.");
    }
  }

  return (
    <div className="min-h-screen px-8 py-8">
      <Navbar />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">공고 관리</h1>
            <p className="mt-2 text-sm text-slate-500">
              내가 등록한 공고와 AI 매칭 기준을 관리합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/jobs/new")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            새 공고 등록
          </button>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </p>
        )}

        {jobs.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              등록한 공고가 없습니다.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              공고를 등록하면 지원자에게 공개되고, 공고별 AI 매칭 기준으로 활용됩니다.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <p className="text-sm text-slate-500">{job.company}</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {job.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      마감일: {job.deadline || "미정"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
                    >
                      공고 상세
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/${job.id}`)}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
                    >
                      지원자 보기
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(job.id)}
                      className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-600 hover:bg-rose-100"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      바라는 인재상
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {job.desiredProfile || "입력된 내용 없음"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      필수 기술스택
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.requiredSkills.length > 0 ? (
                        job.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          입력된 내용 없음
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      핵심 역량
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.coreCompetencies.length > 0 ? (
                        job.coreCompetencies.map((competency) => (
                          <span
                            key={competency}
                            className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                          >
                            {competency}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          입력된 내용 없음
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}