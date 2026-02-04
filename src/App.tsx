import { Routes, Route, NavLink } from "react-router-dom";
import Employees from "./pages/Employees.tsx";
import AttendancePage from "./pages/Attendance.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <nav className="bg-white shadow">
        <div className="w-full px-10 py-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            HRMS Lite
          </h1>

          <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `
                px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }
                `
              }
            >
              Employees
            </NavLink>

            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `
                px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-gray-600 hover:text-blue-600"
                }
                `
              }
            >
              Attendance
            </NavLink>
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
