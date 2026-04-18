import React from "react";

function SidebarSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function TagList({ tags, activeTags, onTagToggle, activeClassName, idleClassName }) {
  return (
    <div className="flex flex-col gap-1.5">
      {tags.map((tag) => {
        const active = activeTags.includes(tag);

        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`rounded-lg border px-3 py-1.5 text-left font-mono text-xs transition-all duration-150 ${
              active ? activeClassName : idleClassName
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export default function FilterSidebar({
  stats,
  searchQuery,
  onSearchChange,
  activeTags,
  onTagToggle,
  onClearTags,
  techTags,
  softTags,
}) {
  return (
    <aside className="sticky top-[73px] flex w-64 flex-shrink-0 flex-col gap-4 max-lg:static max-lg:w-full">
      <SidebarSection title="현황">
        <div className="flex flex-col gap-3">
          {[
            { label: "전체", value: stats.total, accent: "text-slate-800" },
            { label: "검토중", value: stats.reviewing, accent: "text-amber-600" },
            { label: "서류통과", value: stats.passed, accent: "text-blue-600" },
            { label: "최종합격", value: stats.final, accent: "text-green-600" },
          ].map(({ label, value, accent }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {label}
              </span>
              <span className={`text-lg font-bold ${accent}`}>{value}</span>
            </div>
          ))}
        </div>
      </SidebarSection>

      <input
        type="text"
        placeholder="이름, 직무, 학교 검색..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-blue-600 focus:outline-none"
      />

      <SidebarSection title="태그 필터">
        <div className="flex items-center justify-between">
          <span className="text-[11px] tracking-wide text-slate-400">
            지원자 역량 조합 필터
          </span>
          {activeTags.length > 0 ? (
            <button
              onClick={onClearTags}
              className="text-xs text-slate-400 transition-colors hover:text-red-500"
            >
              초기화 ✕
            </button>
          ) : null}
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[11px] font-medium tracking-wide text-slate-400">
            직무 기술
          </p>
          <TagList
            tags={techTags}
            activeTags={activeTags}
            onTagToggle={onTagToggle}
            activeClassName="border-blue-700 bg-blue-700 text-white"
            idleClassName="border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-600 hover:text-blue-600"
          />
        </div>

        <div className="my-4 border-t border-slate-100" />

        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-slate-400">
            핵심 역량
          </p>
          <TagList
            tags={softTags}
            activeTags={activeTags}
            onTagToggle={onTagToggle}
            activeClassName="border-slate-700 bg-slate-700 text-white"
            idleClassName="border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-500 hover:text-slate-700"
          />
        </div>
      </SidebarSection>
    </aside>
  );
}
