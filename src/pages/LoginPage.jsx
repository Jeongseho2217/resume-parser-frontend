import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userType, setUserType] = useState("personal");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">로그인</h1>
        <p className="mt-2 text-sm text-slate-500">
          계정 정보를 입력하고 로그인하세요.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setUserType("personal")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              userType === "personal"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            개인 회원
          </button>

          <button
            onClick={() => setUserType("company")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              userType === "company"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            기업 회원
          </button>
        </div>

        <div className="mt-6 space-y-4">
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
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => navigate(userType === "company" ? "/dashboard" : "/jobs")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
