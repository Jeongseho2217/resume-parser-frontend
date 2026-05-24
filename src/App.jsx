import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JobsPage from "./pages/JobsPage";
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplyPage from "./pages/ApplyPage";
import JobCreatePage from "./pages/JobCreatePage";
import CompanyJobsPage from "./pages/CompanyJobsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { isCompanyUser, isLoggedIn, isPersonalUser } from "./lib/auth";

function LoggedInRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function CompanyRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (!isCompanyUser()) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
}

function PersonalRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (!isPersonalUser()) {
    return <Navigate to="/company/jobs" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/jobs"
        element={
          <PersonalRoute>
            <JobsPage />
          </PersonalRoute>
        }
      />
      <Route
        path="/jobs/new"
        element={
          <CompanyRoute>
            <JobCreatePage />
          </CompanyRoute>
        }
      />
      <Route
        path="/jobs/:jobId"
        element={
          <LoggedInRoute>
            <JobDetailPage />
          </LoggedInRoute>
        }
      />
      <Route
        path="/company/jobs"
        element={
          <CompanyRoute>
            <CompanyJobsPage />
          </CompanyRoute>
        }
      />
      
      <Route path="/dashboard" element={<Navigate to="/company/jobs" replace />} /> {/*대시보드에 공고 아이디를 지정을 안할 경우 공고 페이지로 리다이렉팅*/}

      {/*공고 ID 별 지원자 띄우게 하기 위해 :jobId 추가*/}

      <Route
        path="/dashboard/:jobId"
        element={
          <CompanyRoute>
            <RecruiterDashboardPage />
          </CompanyRoute>
        }
      />

      <Route
        path="/apply/:jobId" 
        element={
          <PersonalRoute>
            <ApplyPage />
          </PersonalRoute>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
