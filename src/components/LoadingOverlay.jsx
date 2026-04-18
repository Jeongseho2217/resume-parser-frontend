import React from "react";

export default function LoadingOverlay({
  message = "AI가 자소서를 분석하고 있습니다...",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="flex min-w-[280px] flex-col items-center gap-5 rounded-3xl bg-white p-8 shadow-2xl">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-r-transparent border-b-transparent border-l-transparent border-t-blue-800" />
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-r-blue-500 border-b-transparent border-l-transparent border-t-transparent [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-800">
            {message}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            잠시만 기다려 주세요
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-800"
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
