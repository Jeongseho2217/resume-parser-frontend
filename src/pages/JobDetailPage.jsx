import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

export default function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();

 const job = jobs.find((item) => String(item.id) === String(jobId));

  if (!job) {
    return (
      <div className="min-h-screen px-8 py-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">공고를 찾을 수 없습니다.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-s
      late-200 bg-white p-8 shadow-sm">
        <button
          onClick={() => navigate("/jobs")}
          className="mb-4 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700"
        >
    &lt; 공고 목록으로 돌아가기
  </button>
        <p className="text-sm text-slate-500">{job.company}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{job.title}</h1>

        <p className="mt-4 text-sm text-slate-600">마감일: {job.deadline}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">주요 업무</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {job.tasks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">자격 요건</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate(`/apply/${jobId}`)}
          className="mt-8 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
        >
          지원하기
        </button>
      </div>
    </div>
  );
}