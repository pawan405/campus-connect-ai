import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AIRoadmap from "./pages/AIRoadmap";
import Hackathons from "./pages/Hackathons";
import Internships from "./pages/Internships";
import SilentScream from "./pages/SilentScream";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import MatchAnalysis from "./pages/MatchAnalysis";
import HackathonPortfolio from "./pages/HackathonPortfolio";
import ResumeMaker from "./pages/ResumeMaker";
import CampusCommunity from "./pages/CampusCommunity";
import HelpSupport from "./pages/HelpSupport";
import Feedback from "./pages/Feedback";
import { AuthProvider } from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/ai-roadmap"
            element={
              <RequireAuth>
                <AIRoadmap />
              </RequireAuth>
            }
          />
          <Route
            path="/hackathons"
            element={
              <RequireAuth>
                <Hackathons />
              </RequireAuth>
            }
          />
          <Route
            path="/internship-feed"
            element={
              <RequireAuth>
                <Internships />
              </RequireAuth>
            }
          />
          <Route
            path="/silent-scream"
            element={
              <RequireAuth>
                <SilentScream />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          {/* New routes */}
          <Route
            path="/analytics"
            element={
              <RequireAuth>
                <Analytics />
              </RequireAuth>
            }
          />
            <Route
              path="/match-analysis"
              element={
                <RequireAuth>
                  <MatchAnalysis />
                </RequireAuth>
              }
            />
            <Route
              path="/neural-intelligence"
              element={
                <RequireAuth>
                  <MatchAnalysis />
                </RequireAuth>
              }
            />
            <Route
              path="/hackathon-portfolio"
              element={
                <RequireAuth>
                  <HackathonPortfolio />
                </RequireAuth>
              }
            />
            <Route
              path="/resume-maker"
              element={
                <RequireAuth>
                  <ResumeMaker />
                </RequireAuth>
              }
            />
            <Route
              path="/campus-community"
              element={
                <RequireAuth>
                  <CampusCommunity />
                </RequireAuth>
              }
            />
            <Route
              path="/help-support"
              element={
                <RequireAuth>
                  <HelpSupport />
                </RequireAuth>
              }
            />
            <Route
              path="/feedback"
              element={
                <RequireAuth>
                  <Feedback />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }

export default App;
