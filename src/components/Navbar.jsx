import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="mb-8 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate("/")}
          className="text-lg font-bold text-slate-900"
        >
          LLM 채용 플랫폼
        </button>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/jobs")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
          >
            공고 보기
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
          >
            대시보드
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
          >
            회원가입
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}