import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/landing/Home";
import Dashboard from "./pages/Dashboard";
import World from "./pages/World";
import Mission from "./pages/Mission";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/privacy/CookieConsent";
import Missions from "./pages/Missions";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Authenticated-only routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/world" element={<World />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/mission/:chapterId" element={<Mission />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>

    <CookieConsent />
    </>
  );
}

export default App;
