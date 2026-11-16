import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/landing/Home";
import Dashboard from "./pages/Dashboard";
import World from "./pages/World";
import Mission from "./pages/Mission";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/world" element={<World />} />
        <Route path="/mission/:chapterId" element={<Mission />} />
      </Route>
    </Routes>
  );
}

export default App;
