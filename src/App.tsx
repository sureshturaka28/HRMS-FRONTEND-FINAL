import { Routes, Route, Link } from "react-router-dom";
import Employees from "./pages/Employees";
import AttendancePage from "./pages/Attendance";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <nav className="bg-white shadow">
        <div className="w-full px-10 py-6  flex justify-between">
          <h1 className="text-xl font-semibold text-gray-700">HRMS Lite</h1>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Employees
            </Link>
            <Link
              to="/attendance"
              className="text-gray-600 hover:text-blue-600"
            >
              Attendance
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full px-10 py-6">
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#111827",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
