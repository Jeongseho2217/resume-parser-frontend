import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../lib/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const isCompany = currentUser?.userType === "company";

  function handleLogout() {
    logoutUser();
    setCurrentUser(null);
    navigate("/");
  }

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
          {isCompany && (
            <button
              onClick={() => navigate("/company/jobs")}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              공고 관리
            </button>
          )}

          {currentUser?.userType === "personal" && (
            <button
              onClick={() => navigate("/jobs")}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              공고 보기
            </button>
          )}

          {isCompany && (
            <button
              onClick={() => navigate("/jobs/new")}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              공고 등록
            </button>
          )}

          {isCompany && (
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
            >
              대시보드
            </button>
          )}

          {currentUser ? (
            <>
              <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm text-blue-700">
                {currentUser.name || currentUser.email}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
