import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCandidateDetail,
  fetchCandidates,
  updateCandidateStatus,
} from "../lib/api";
import { STATUS_CONFIG } from "../lib/constants";
import ApplicantCard from "../components/ApplicantCard";
import ApplicantModal from "../components/ApplicantModal";
import Navbar from "../components/Navbar";

export default function RecruiterDashboardPage() {
  const { jobId } = useParams(); //URL에서 현재 공고 ID 꺼내기
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(-1);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    if (jobId) {
      loadApplicants(1, selectedTag);
    }
  }, [selectedTag, jobId]); // jobId 추가

  async function loadApplicants(page = 1, hashtag = "") {
    try {
      setLoading(true);
      setListError("");

      const data = await fetchCandidates({
        jobId: jobId, // 백엔드에 이 공고번호 지원자들에 신호를 보냄
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
        applicant.major?.toLowerCase().includes(keyword) ||
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

  async function openApplicant(applicant, index) {
    setSelectedApplicant(applicant);
    setSelectedApplicantIndex(index);
    setDetailLoading(true);
    setDetailError("");

    try {
      const detail = await fetchCandidateDetail(applicant.resumeId || applicant.id, applicant);

      if (detail.status === "FAILED") {
        setDetailError(detail.message || "상세 정보를 불러오지 못했습니다.");
        return;
      }

      if (detail.analysisResult) {
        setSelectedApplicant(detail.analysisResult);
      }
    } catch (error) {
      console.error(error);
      setDetailError("상세 정보를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  }

  function openApplicantByIndex(index) {
    if (index < 0 || index >= filteredApplicants.length) {
      return;
    }

    openApplicant(filteredApplicants[index], index);
  }

  function closeApplicantModal() {
    setSelectedApplicant(null);
    setSelectedApplicantIndex(-1);
    setDetailLoading(false);
    setDetailError("");
    setStatusUpdating(false);
  }

  async function handleStatusChange(nextStatus) {
    if (!selectedApplicant || nextStatus === selectedApplicant.status) {
      return;
    }

    const previousApplicant = selectedApplicant;
    const resumeId = selectedApplicant.resumeId || selectedApplicant.id;

    setStatusUpdating(true);
    setDetailError("");
    setSelectedApplicant((applicant) => ({ ...applicant, status: nextStatus }));
    setApplicants((items) =>
      items.map((applicant) =>
        String(applicant.resumeId || applicant.id) === String(resumeId)
          ? { ...applicant, status: nextStatus }
          : applicant
      )
    );

    try {
      await updateCandidateStatus(resumeId, nextStatus);
    } catch (error) {
      console.error(error);
      setDetailError("전형 상태를 저장하지 못했습니다.");
      setSelectedApplicant(previousApplicant);
      setApplicants((items) =>
        items.map((applicant) =>
          String(applicant.resumeId || applicant.id) === String(resumeId)
            ? { ...applicant, status: previousApplicant.status }
            : applicant
        )
      );
    } finally {
      setStatusUpdating(false);
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (!selectedApplicant) return;

      if (event.key === "Escape") {
        closeApplicantModal();
      }

      if (event.key === "ArrowLeft") {
        openApplicantByIndex(selectedApplicantIndex - 1);
      }

      if (event.key === "ArrowRight") {
        openApplicantByIndex(selectedApplicantIndex + 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredApplicants, selectedApplicant, selectedApplicantIndex]);

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
                  {filteredApplicants.map((applicant, index) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant={applicant}
                      onSelect={() => openApplicant(applicant, index)}
                      statusConfig={STATUS_CONFIG}
                    />
                  ))}
                </div>

                {selectedApplicant && (
                  <ApplicantModal
                    applicant={selectedApplicant}
                    onClose={closeApplicantModal}
                    onPrevious={() => openApplicantByIndex(selectedApplicantIndex - 1)}
                    onNext={() => openApplicantByIndex(selectedApplicantIndex + 1)}
                    onStatusChange={handleStatusChange}
                    canPrevious={selectedApplicantIndex > 0}
                    canNext={selectedApplicantIndex < filteredApplicants.length - 1}
                    loading={detailLoading}
                    error={detailError}
                    statusUpdating={statusUpdating}
                    statusConfig={STATUS_CONFIG}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
