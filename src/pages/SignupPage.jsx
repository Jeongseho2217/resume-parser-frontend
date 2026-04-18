import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignupPage() {
  const [userType, setUserType] = useState("personal");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-8 py-8">
      <Navbar />

      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          {userType === "company" ? "기업 회원가입" : "개인 회원가입"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {userType === "company"
            ? "기업 정보를 입력하고 담당자 계정을 생성하세요."
            : "개인 정보를 입력하고 지원자 계정을 생성하세요."}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setUserType("personal")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              userType === "personal"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            개인 회원
          </button>

          <button
            type="button"
            onClick={() => setUserType("company")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
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
              이름
            </label>
            <input
              type="text"
              placeholder={userType === "company" ? "담당자 이름을 입력하세요" : "이름을 입력하세요"}
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
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {userType === "personal" ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  전화번호
                </label>
                <input
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  학교
                </label>
                <input
                  type="text"
                  placeholder="학교명을 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  전공
                </label>
                <input
                  type="text"
                  placeholder="전공을 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  회사명
                </label>
                <input
                  type="text"
                  placeholder="회사명을 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  회사 전화번호
                </label>
                <input
                  type="text"
                  placeholder="회사 전화번호를 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  기업 설명
                </label>
                <textarea
                  rows="4"
                  placeholder="기업 소개를 입력하세요"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => navigate(userType === "company" ? "/dashboard" : "/jobs")}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            회원가입 완료
          </button>
        </div>
      </div>
    </div>
  );
}