import React, { useCallback, useEffect, useState } from "react";
import ApplicantCard from "./components/ApplicantCard";
import ApplicantModal from "./components/ApplicantModal";
import FilterSidebar from "./components/FilterSidebar";
import LoadingOverlay from "./components/LoadingOverlay";
import { fetchCandidateDetail, fetchCandidates } from "./lib/api";
import { SKILL_TAGS, STATUS_CONFIG } from "./lib/constants";

export default function App() {
  // 화면에 보여줄 지원자 카드 목록
  const [applicants, setApplicants] = useState([]);
  // 사용자가 고른 태그들
  const [activeTags, setActiveTags] = useState([]);
  // 지금 모달에 띄운 지원자
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  // 로딩 화면 켜기/끄기
  const [loading, setLoading] = useState(false);
  // 로딩 화면 안에 보여줄 글자
  const [loadingMsg, setLoadingMsg] = useState("");
  // 이전/다음 넘길 때 방향 기억
  const [moveDirection, setMoveDirection] = useState(0);
  // 검색창에 입력한 글자
  const [searchQuery, setSearchQuery] = useState("");
  // 목록을 못 불러왔을 때 보여줄 에러 문구
  const [listError, setListError] = useState("");
  // 페이지 정보
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const handleTagToggle = useCallback((tag) => {
    // 이미 눌린 태그면 빼고, 아니면 추가
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  }, []);

  const openApplicantDetail = useCallback(async (applicant) => {
    // 카드에는 짧은 정보만 있어서 상세를 다시 요청
    let detailResponse = await fetchCandidateDetail(applicant.resumeId, applicant);

    while (detailResponse.status === "PENDING") {
      // 분석 중이면 다시 조회
      setLoadingMsg("AI가 자소서를 분석하고 있습니다...");
      await new Promise((resolve) => {
        window.setTimeout(resolve, 1200);
      });
      detailResponse = await fetchCandidateDetail(applicant.resumeId, applicant);
    }

    if (detailResponse.status === "FAILED") {
      // 실패하면 모달 대신 경고창
      window.alert(detailResponse.message);
      return;
    }

    // 성공하면 상세 정보로 모달 열기
    setSelectedApplicant(detailResponse.analysisResult);
  }, []);

  const loadApplicants = useCallback(async () => {
    // 목록 다시 불러오기
    setLoadingMsg("지원자 목록을 불러오는 중...");
    setLoading(true);
    setListError("");

    try {
      // 지금 고른 태그를 넣어서 목록 조회
      const response = await fetchCandidates({
        page: 1,
        pageSize: 10,
        hashtag: activeTags[0],
      });

      // 가져온 카드 목록 저장
      setApplicants(response.candidates);
      // 페이지 정보도 같이 저장
      setPageInfo(response.pageInfo);
    } catch (error) {
      // 실패하면 에러 문구 띄우고 목록 비우기
      setListError("지원자 목록을 불러오지 못했습니다.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  }, [activeTags]);

  const handleSelectApplicant = useCallback(async (applicant) => {
    // 모달 열 때 상세 한 번 더 조회
    setMoveDirection(0);
    setLoadingMsg("지원자 상세 정보를 불러오는 중...");
    setLoading(true);

    try {
      await openApplicantDetail(applicant);
    } catch (error) {
      window.alert("지원자 상세 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [openApplicantDetail]);

  useEffect(() => {
    if (!selectedApplicant) {
      return undefined;
    }

    // 모달 열려 있을 때 esc 누르면 닫기
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedApplicant(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedApplicant]);

  useEffect(() => {
    // 화면 처음 열리거나 태그가 바뀌면 다시 조회
    loadApplicants();
  }, [loadApplicants]);

  const filteredApplicants = applicants.filter((applicant) => {
    // 누른 태그가 전부 들어있는지 확인
    const tagMatch = activeTags.every((tag) => applicant.tags.includes(tag));
    // 검색어가 이름/직무/학교에 들어있는지 확인
    const searchMatch =
      searchQuery === "" ||
      applicant.name.includes(searchQuery) ||
      applicant.position.includes(searchQuery) ||
      applicant.school.includes(searchQuery);

    return tagMatch && searchMatch;
  });

  // 현재 목록 기준 태그
  const allTags = [...new Set(applicants.flatMap((applicant) => applicant.tags))].sort();
  const techTags = allTags.filter((tag) => !SKILL_TAGS.includes(tag));
  const softTags = allTags.filter((tag) => SKILL_TAGS.includes(tag));

  // 사이드바 숫자
  const stats = {
    total: pageInfo.totalCount,
    reviewing: applicants.filter((applicant) => applicant.status === "검토중").length,
    passed: applicants.filter((applicant) => applicant.status === "서류통과").length,
    final: applicants.filter((applicant) => applicant.status === "최종합격").length,
  };

  const selectedIndex = selectedApplicant
    ? filteredApplicants.findIndex(
        (applicant) => applicant.resumeId === selectedApplicant.resumeId
      )
    : -1;
  const prevApplicant = selectedIndex > 0 ? filteredApplicants[selectedIndex - 1] : null;
  const nextApplicant =
    selectedIndex >= 0 && selectedIndex < filteredApplicants.length - 1
      ? filteredApplicants[selectedIndex + 1]
      : null;

  const handleMoveApplicant = useCallback(async (direction) => {
    if (selectedIndex < 0) {
      return;
    }

    const nextApplicant = filteredApplicants[selectedIndex + direction];

    if (!nextApplicant) {
      return;
    }

    setMoveDirection(direction);

    try {
      await openApplicantDetail(nextApplicant);
    } catch (error) {
      window.alert("지원자 상세 정보를 불러오지 못했습니다.");
    }
  }, [filteredApplicants, openApplicantDetail, selectedIndex]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      {/* 불러오는 중이면 전체 화면 로딩 */}
      {loading ? <LoadingOverlay message={loadingMsg} /> : null}
      {/* 선택한 지원자가 있으면 상세 모달 열기 */}
      {selectedApplicant ? (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onPrev={() => handleMoveApplicant(-1)}
          onNext={() => handleMoveApplicant(1)}
          prevApplicant={prevApplicant}
          nextApplicant={nextApplicant}
          canPrev={selectedIndex > 0}
          canNext={selectedIndex >= 0 && selectedIndex < filteredApplicants.length - 1}
          currentIndex={selectedIndex}
          totalCount={filteredApplicants.length}
          moveDirection={moveDirection}
          statusConfig={STATUS_CONFIG}
        />
      ) : null}

      {/* 위쪽 고정 헤더 */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900">
                자소서 분석 대시보드
              </h1>
              <p className="mt-0.5 text-xs text-slate-400">
                LLM-Powered Resume Parser
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 본문 영역 */}
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6">
        <div className="flex items-start gap-6 max-lg:flex-col">
          {/* 왼쪽 필터 영역 */}
          <FilterSidebar
            activeTags={activeTags}
            onClearTags={() => setActiveTags([])}
            onSearchChange={setSearchQuery}
            onTagToggle={handleTagToggle}
            searchQuery={searchQuery}
            stats={stats}
            techTags={techTags}
            softTags={softTags}
          />

          {/* 오른쪽 카드 영역 */}
          <section className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">
                  {filteredApplicants.length}명
                </span>
                의 지원자
                {activeTags.length > 0 ? (
                  <span className="ml-1 text-blue-600">
                    ({activeTags.length}개 태그 필터 적용)
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-slate-400">
                카드 클릭 시 자소서 상세 조회
              </p>
            </div>

            {listError ? (
              // 목록 요청 실패 안내
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {listError}
              </div>
            ) : null}

            {filteredApplicants.length > 0 ? (
              // 조건에 맞는 지원자 카드 목록
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredApplicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    onSelect={handleSelectApplicant}
                    statusConfig={STATUS_CONFIG}
                  />
                ))}
              </div>
            ) : (
              // 필터 결과가 없을 때
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-slate-400">
                <p className="mb-3 text-4xl">○</p>
                <p className="text-sm font-medium">
                  해당 태그 조건의 지원자가 없습니다
                </p>
                <button
                  onClick={() => setActiveTags([])}
                  className="mt-2 text-xs text-blue-600 transition-colors hover:text-blue-800"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
