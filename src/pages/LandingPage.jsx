import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-10">
      <Navbar />

      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-blue-600">
          Resume Parsing & Hiring Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          LLM 기반 채용 지원 플랫폼
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
          지원자는 채용 공고를 확인하고 이력서를 제출할 수 있고,
          기업은 지원자를 AI 분석 결과와 함께 빠르게 검토할 수 있습니다.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-2xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            로그인하기
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            회원가입하기
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          로그인 후 개인 회원과 기업 회원을 선택해 이용할 수 있습니다.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">지원자</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              공고를 확인하고 원하는 직무에 맞춰 이력서와 자기소개를 제출할 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">기업</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              지원자 요약 카드, 태그, 매칭 점수를 통해 빠르게 후보자를 비교할 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">AI 분석</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              비정형 자소서를 정리된 정보와 핵심 역량 태그로 변환해 검토 효율을 높입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}