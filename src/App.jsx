<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
>>>>>>> 7c9ae6e94bc113e6f2d3e8b4dfa00129e3b54d8d
