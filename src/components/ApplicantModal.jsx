import React, { useEffect, useState } from "react";

export default function ApplicantModal({
  applicant,
  onClose,
  statusConfig,
}) {
  const [previewStatus, setPreviewStatus] = useState(applicant.status);

  useEffect(() => {
    setPreviewStatus(applicant.status);
  }, [applicant]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b border-slate-100 bg-white px-6 py-4">
          <div>
            <p className="font-bold text-slate-900">
              {applicant.name}
            </p>
            <p className="text-xs text-slate-400">
              {applicant.position || "지원자 상세 정보"}
              {applicant.school ? ` · ${applicant.school}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-2 text-xl leading-none text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
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

          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {[
              { label: "경력", value: applicant.experience || "-" },
              { label: "지원일", value: applicant.candidateDate || applicant.appliedAt || "-" },
              { label: "AI 매칭", value: `${applicant.matchingScore ?? "-"}점` },
              { label: "분석 상태", value: applicant.analysisStatus || "-" },
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
    </div>
  );
}
