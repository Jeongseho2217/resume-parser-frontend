import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllJobs } from "../lib/jobs";

export default function JobsPage() {
  const navigate = useNavigate();
  const jobs = getAllJobs();

  return (
    <div className="min-h-screen px-8 py-8">
      <Navbar />
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">채용 공고</h1>
        <p className="mt-2 text-sm text-slate-500">
          지원자는 공고를 확인하고 이력서를 제출할 수 있습니다.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {jobs.map((job, index) => (
              <article key={`${job.id}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{job.company}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {job.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                마감일: {job.deadline}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
              >
                공고 보기
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
