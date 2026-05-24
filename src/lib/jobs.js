import { jobs as seedJobs } from "../data/jobs";
import { getCurrentUser } from "./auth";

const LOCAL_JOBS_KEY = "front2.jobs";

function readLocalJobs() {
  try {
    const value = window.localStorage.getItem(LOCAL_JOBS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeLocalJobs(jobs) {
  window.localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(jobs));
}

function normalizeJob(job) {
  return {
    tasks: [],
    requirements: [],
    tags: [],
    requiredSkills: [],
    preferredSkills: [],
    coreCompetencies: [],
    desiredProfile: "",
    preferred: "",
    ...job,
  };
}

export function getAllJobs() {
  return [...seedJobs, ...readLocalJobs()].map(normalizeJob);
}

export function getJobById(jobId) {
  return getAllJobs().find((job) => String(job.id) === String(jobId));
}

export function getMyCompanyJobs() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return [];
  }

  return readLocalJobs()
    .filter((job) => job.ownerId === currentUser.id)
    .map(normalizeJob);
}

export function addCompanyJob(job) {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.userType !== "company") {
    throw new Error("기업 회원만 공고를 등록할 수 있습니다.");
  }

  const localJobs = readLocalJobs();
  const newJob = normalizeJob({
    ...job,
    id: `local_${Date.now()}`,
    ownerId: currentUser.id,
    ownerEmail: currentUser.email,
    createdAt: new Date().toISOString(),
  });

  writeLocalJobs([newJob, ...localJobs]);
  return newJob;
}

export function removeCompanyJob(jobId) {
  const currentUser = getCurrentUser();
  const localJobs = readLocalJobs();
  const job = localJobs.find((item) => String(item.id) === String(jobId));

  if (!currentUser || !job || job.ownerId !== currentUser.id) {
    throw new Error("삭제할 수 없는 공고입니다.");
  }

  writeLocalJobs(localJobs.filter((item) => String(item.id) !== String(jobId)));
}
