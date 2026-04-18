import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JobsPage from "./pages/JobsPage";
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplyPage from "./pages/ApplyPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailPage />} />
      <Route path="/dashboard" element={<RecruiterDashboardPage />} />
      <Route path="/apply/:jobId" element={<ApplyPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}