import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/landing/Home";
import Dashboard from "./pages/Dashboard";
import World from "./pages/World";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/world" element={<World />} />
    </Routes>
  );
}

export default App;
