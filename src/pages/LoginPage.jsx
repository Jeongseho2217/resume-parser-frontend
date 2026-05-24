import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../lib/auth";

export default function LoginPage() {
  const [userType, setUserType] = useState("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      setError("");
      loginUser({ email, password, userType });
      navigate(userType === "company" ? "/dashboard" : "/jobs");
    } catch (err) {
      setError(err.message || "로그인에 실패했습니다.");
    }
  }

  return (
    <div className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            회원가입
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            로그인
          </button>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">로그인</h1>
        <p className="mt-2 text-sm text-slate-500">
          계정 정보를 입력하고 로그인하세요.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setUserType("personal")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              userType === "personal"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            개인 회원
          </button>

          <button
            type="button"
            onClick={() => setUserType("company")}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              userType === "company"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            기업 회원
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}