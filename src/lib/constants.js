// 소프트스킬 태그 묶음
export const SKILL_TAGS = [
  "#문제해결능력",
  "#팀워크",
  "#소통능력",
  "#도전정신",
  "#성장가능성",
  "#성능최적화",
  "#접근성",
];

// 전형 상태 색
export const STATUS_CONFIG = {
  검토중: {
    bg: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
  },
  서류통과: {
    bg: "bg-blue-100 text-blue-600",
    dot: "bg-blue-400",
  },
  최종합격: {
    bg: "bg-green-100 text-green-800",
    dot: "bg-green-400",
  },
  불합격: {
    bg: "bg-slate-100 text-slate-500",
    dot: "bg-slate-400",
  },
};

// 분석 상태 문구
export const ANALYSIS_STATUS_LABEL = {
  PENDING: "분석 진행 중",
  DONE: "분석 완료",
  FAILED: "분석 실패",
};
