import React, { useEffect, useState } from "react";

export default function ApplicantModal({
  applicant,
  onClose,
  onPrev,
  onNext,
  prevApplicant,
  nextApplicant,
  canPrev,
  canNext,
  currentIndex,
  totalCount,
  moveDirection,
  statusConfig,
}) {
  // 버튼 눌렀을 때 모달 안에서만 바뀌는 상태
  const [previewStatus, setPreviewStatus] = useState(applicant.status);

  function formatAppliedDate(value) {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${year}년 ${month}월 ${day}일 ${period} ${displayHour}:${minute}`;
  }

  useEffect(() => {
    // 다른 지원자를 열면 상태 버튼도 다시 맞추기
    setPreviewStatus(applicant.status);
  }, [applicant]);

  function SideApplicantCard({ side, candidate, onMove, disabled }) {
    if (!candidate) {
      return (
        <div className="hidden xl:flex xl:w-64 xl:flex-col xl:justify-center">
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-5 text-center text-sm text-slate-300 shadow-sm backdrop-blur">
            더 볼 지원자 없음
          </div>
        </div>
      );
    }

    return (
      <div className="hidden xl:flex xl:w-64 xl:flex-col xl:justify-center">
        <button
          type="button"
          onClick={onMove}
          disabled={disabled}
          className="rounded-3xl border border-white/40 bg-white/78 p-5 text-left shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-200 disabled:cursor-not-allowed"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {side}
          </p>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-800">
                {candidate.name}
              </p>
              <p className="mt-1 truncate text-xs text-slate-500">
                {candidate.position || "지원자"}
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
              {candidate.matchingScore ?? "-"}점
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-slate-500">
              {candidate.school || "학교 정보 없음"}
            </p>
            <p className="text-xs text-slate-400">
              {candidate.experience ? `경력 ${candidate.experience}` : "경력 정보 없음"}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {candidate.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        // 어두운 배경을 누르면 모달 닫기
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* 양옆 카드랑 가운데 상세 */}
      <div className="relative flex w-full max-w-[1200px] items-stretch justify-center gap-4">
        <SideApplicantCard
          side="이전 지원자"
          candidate={prevApplicant}
          onMove={onPrev}
          disabled={!canPrev}
        />

        {/* 모달 상자 */}
        <div
          key={`${applicant.resumeId}-${moveDirection}`}
          className={`flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl ${
            moveDirection > 0
              ? "applicant-detail-enter-next"
              : moveDirection < 0
                ? "applicant-detail-enter-prev"
                : "applicant-detail-fade"
          }`}
        >
          {/* 모달 맨 위 */}
          <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-slate-100 bg-white px-6 py-4">
            <div>
              <p className="font-bold text-slate-900">
                {applicant.name}
              </p>
              <p className="text-xs text-slate-400">
                {applicant.position || "지원자 상세 정보"}
                {applicant.school ? ` · ${applicant.school}` : ""}
              </p>
              {currentIndex >= 0 ? (
                <p className="mt-1 text-[11px] text-slate-400">
                  {currentIndex + 1} / {totalCount}
                </p>
              ) : null}
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-50 px-3 py-1.5 text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
                  AI 매칭
                </p>
                <p className="text-sm font-bold text-blue-700">
                  {applicant.matchingScore ?? "-"}점
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-2 text-xl leading-none text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6">
          {/* 전형 상태 버튼 */}
            <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
              <span className="w-20 text-xs font-semibold uppercase tracking-widest text-slate-500">
                상태
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(statusConfig).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setPreviewStatus(status)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                      previewStatus === status
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-slate-200 text-slate-500 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* 숫자/날짜 같은 기본 정보 */}
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              {[
                { label: "경력", value: applicant.experience || "-" },
                {
                  label: "지원일",
                  value: formatAppliedDate(applicant.candidateDate || applicant.appliedAt),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-slate-50 p-3"
                >
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* 태그들 */}
            <section>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                LLM 추출 역량 태그
              </p>
              <div className="flex flex-wrap gap-2">
                {applicant.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* 3줄 요약 */}
            <section>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                AI 핵심 요약
              </p>
              <div className="space-y-2">
                {applicant.summary.map((line, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3"
                  >
                    <span className="mt-0.5 font-mono text-xs font-bold text-blue-600">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 자소서 원문 */}
            <section>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                자소서 원문
              </p>
              <div className="max-h-48 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="whitespace-pre-line text-sm leading-loose text-slate-700">
                  {applicant.resume || "상세 자소서 원문이 없습니다."}
                </p>
              </div>
            </section>

            {/* 아직 연결 안 한 삭제 버튼 */}
            <div className="border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled
                className="cursor-not-allowed text-xs text-red-300"
              >
                삭제
              </button>
            </div>
          </div>
        </div>

        <SideApplicantCard
          side="다음 지원자"
          candidate={nextApplicant}
          onMove={onNext}
          disabled={!canNext}
        />
      </div>
    </div>
  );
}
