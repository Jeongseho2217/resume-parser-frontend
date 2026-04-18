import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { jobId } = useParams();
const job = jobs.find((item) => String(item.id) === String(jobId));

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
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">지원하기</h1>
        <p className="mt-2 text-sm text-slate-500">
        {job ? `${job.company} · ${job.title}` : "아래 정보를 입력하고 이력서를 제출하세요."}
       </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              이름
            </label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              자기소개
            </label>
            <textarea
              placeholder="간단한 자기소개를 입력하세요"
              rows="6"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              이력서 파일
            </label>
            <input
              type="file"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"
            />
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}