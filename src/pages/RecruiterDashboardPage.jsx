import React, { useEffect, useMemo, useState } from "react";
import { fetchCandidates } from "../lib/api";
import { STATUS_CONFIG } from "../lib/constants";
import Navbar from "../components/Navbar";

export default function RecruiterDashboardPage() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    loadApplicants(1, selectedTag);
  }, [selectedTag]);

  async function loadApplicants(page = 1, hashtag = "") {
    try {
      setLoading(true);
      setListError("");

      const data = await fetchCandidates({
        page,
        hashtag: hashtag || undefined,
      });

      setApplicants(data.candidates || []);
      setPageInfo(data.pageInfo || {});
    } catch (error) {
      console.error(error);
      setListError("지원자 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const filteredApplicants = useMemo(() => {
    if (!searchQuery.trim()) return applicants;

    const keyword = searchQuery.toLowerCase();

    return applicants.filter((applicant) => {
      return (
        applicant.name?.toLowerCase().includes(keyword) ||
        applicant.position?.toLowerCase().includes(keyword) ||
        applicant.school?.toLowerCase().includes(keyword) ||
        applicant.tags?.some((tag) => tag.toLowerCase().includes(keyword))
      );
    });
  }, [applicants, searchQuery]);

  const allTags = useMemo(() => {
    const tagSet = new Set();

    applicants.forEach((applicant) => {
      applicant.tags?.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet);
  }, [applicants]);

  return (
    <div className="min-h-screen px-8 py-8">
      <Navbar />

      <div className="mx-auto mt-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">담당자 대시보드</h1>
        <p className="mt-2 text-sm text-slate-500">
          지원자 목록을 확인하고 빠르게 비교하는 화면
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">필터</h2>

            <input
              type="text"
              placeholder="이름, 직무, 학교, 태그 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-slate-700">태그 선택</p>

              <button
                onClick={() => setSelectedTag("")}
                className={`mb-2 w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  selectedTag === ""
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                전체 보기
              </button>

              <div className="space-y-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                      selectedTag === tag
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-semibold text-slate-800">
                총 {pageInfo.totalCount || filteredApplicants.length}명
              </p>

              {selectedTag && (
                <button
                  onClick={() => setSelectedTag("")}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600"
                >
                  태그 해제
                </button>
              )}
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
                지원자 목록 불러오는 중...
              </div>
            ) : listError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-600 shadow-sm">
                {listError}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                  {filteredApplicants.map((applicant) => {
                    const status =
                      STATUS_CONFIG[applicant.status] || STATUS_CONFIG["검토중"];

                    return (
                      <article
                        key={applicant.id}
                        onClick={() => setSelectedApplicant(applicant)}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {applicant.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {applicant.position || "직무 정보 없음"}
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                              AI 매칭 {applicant.matchingScore}점
                            </div>
                            <div
                              className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${status.bg}`}
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${status.dot}`}
                              />
                              {applicant.status}
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                          {applicant.school}{" "}
                          {applicant.experience ? `· ${applicant.experience}` : ""}
                        </p>

                        <div className="mt-4 space-y-2 text-sm text-slate-700">
                          {applicant.summary?.slice(0, 2).map((item, index) => (
                            <p key={index}>
                              {index + 1}. {item}
                            </p>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {applicant.tags?.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {selectedApplicant && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900">
                            {selectedApplicant.name}
                          </h2>
                          <p className="mt-1 text-slate-600">
                            {selectedApplicant.position || "직무 정보 없음"}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedApplicant(null)}
                          className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600"
                        >
                          닫기
                        </button>
                      </div>

                      <p className="text-slate-500">
                        {selectedApplicant.school}{" "}
                        {selectedApplicant.experience
                          ? `· ${selectedApplicant.experience}`
                          : ""}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-slate-700">
                        {selectedApplicant.summary?.map((item, index) => (
                          <p key={index}>
                            {index + 1}. {item}
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedApplicant.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}