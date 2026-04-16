import React from "react";
import { ANALYSIS_STATUS_LABEL } from "../lib/constants";

export default function ApplicantCard({
  applicant,
  onSelect,
  statusConfig,
}) {
  // 현재 지원자 상태에 맞는 색 가져오기
  const status = statusConfig[applicant.status] || statusConfig.검토중;

  return (
    <article
      // 카드 누르면 상세 모달 열기
      onClick={() => onSelect(applicant)}
      className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100"
    >
      {/* 카드 맨 위 */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold leading-none text-slate-900">
            {applicant.name}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {applicant.position || ANALYSIS_STATUS_LABEL[applicant.analysisStatus]}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            AI 매칭 {applicant.matchingScore}점
          </span>
          <span
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {applicant.status}
          </span>
        </div>
      </div>

      {applicant.school || applicant.experience ? (
        // 학교나 경력이 있으면 이 줄 보여주기
        <div className="flex gap-3 text-xs text-slate-400">
          {applicant.school ? <span>{applicant.school}</span> : null}
          {applicant.school && applicant.experience ? <span>·</span> : null}
          {applicant.experience ? <span>경력 {applicant.experience}</span> : null}
        </div>
      ) : (
        // 목록 응답에 학교/경력이 없으면 분석 상태만 보여주기
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
          분석 상태: {ANALYSIS_STATUS_LABEL[applicant.analysisStatus] || applicant.analysisStatus}
        </div>
      )}

      {applicant.summary.length > 0 ? (
        // 요약이 있으면 줄 번호랑 같이 보여주기
        <div className="space-y-1.5">
          {applicant.summary.map((line, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-blue-600">
                0{index + 1}
              </span>
              <p className="text-xs leading-relaxed text-slate-600">
                {line}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // 요약이 아직 없을 때 대신 보여줄 문구
        <p className="rounded-2xl bg-slate-50 px-3 py-3 text-xs leading-relaxed text-slate-500">
          API 목록 응답 기준으로 직무 기술 태그와 핵심 역량 태그 중심의 요약 카드입니다.
        </p>
      )}

      {/* 태그 모음 */}
      <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-1">
        {applicant.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 카드 아래 안내 문구 */}
      <p className="-mb-1 text-right text-[11px] text-slate-300 transition-colors group-hover:text-blue-700">
        클릭하여 자소서 전문 보기 →
      </p>
    </article>
  );
}
