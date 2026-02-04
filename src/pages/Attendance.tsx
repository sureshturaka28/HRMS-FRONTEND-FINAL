import { useEffect, useState } from "react";
import api from "../services/api";
import type { Employee } from "../types/employee";
import type { Attendance } from "../types/attendance";
import Card from "../components/ui/Card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AttendancePage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [status, setStatus] = useState<"Present" | "Absent">("Present");
  const [date, setDate] = useState(today);
  const [filterDate, setFilterDate] = useState("");
  const [summary, setSummary] = useState({
    total_present_days: 0,
    total_absent_days: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch {
        toast.error("Failed to load employees");
      }
    };
    fetchEmployees();
  }, []);

  const fetchAttendance = async () => {
    if (!selectedEmployee) return;

    setLoading(true);

    try {
      const url = filterDate
        ? `/attendance/${selectedEmployee}?date=${filterDate}`
        : `/attendance/${selectedEmployee}`;

      const res = await api.get(url);
      setAttendanceList(res.data);

      const summaryRes = await api.get(
        `/attendance/summary/${selectedEmployee}`
      );
      setSummary(summaryRes.data);
    } catch {
      toast.error("Failed to fetch attendance");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedEmployee, filterDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmployee) {
      toast.error("Please select employee");
      return;
    }

    try {
      await api.post("/attendance", {
        employee_id: selectedEmployee,
        date,
        status,
      });

      toast.success("Attendance marked successfully");
      fetchAttendance();
    } catch (err) {
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;

        if (Array.isArray(detail)) {
          toast.error(detail[0].msg);
        } else {
          toast.error(detail);
        }
      } else {
        toast.error("Error marking attendance");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 text-gray-800"
    >
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold">Attendance Management</h2>
        <p className="text-gray-500 mt-1">
          Mark daily attendance and review employee attendance records.
        </p>
      </div>

      {/* MARK ATTENDANCE SECTION */}
      <Card>
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Mark Attendance
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          {/* Employee Select */}
          <select
            className="
              bg-white
              text-gray-900
              border border-gray-300
              rounded-xl px-4 py-3
              focus:ring-2 focus:ring-blue-500
              focus:outline-none
              transition-all
            "
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.employee_id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          {/* Date Input with Icon */}
          <div className="relative w-full">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => {
                const input = e.currentTarget;
                if (input.showPicker) {
                  input.showPicker();
                }
              }}
              className="
      w-full
      bg-white
      text-gray-900
      border border-gray-300
      rounded-xl px-4 py-3 pr-10
      focus:ring-2 focus:ring-blue-500
      focus:outline-none
      transition-all
      cursor-pointer
    "
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              📅
            </span>
          </div>

          {/* Status Toggle */}
          <div className="flex gap-2">
            {["Present", "Absent"].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStatus(s as "Present" | "Absent")}
                className={`
                  flex-1 py-3 rounded-xl transition-all duration-200
                  ${
                    status === s
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700"
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="
              bg-blue-600 text-white py-3 rounded-xl
              hover:bg-blue-700 active:scale-95
              transition-all duration-200 shadow-md
            "
          >
            Mark
          </button>
        </form>
      </Card>

      {/* SECTION DIVIDER */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* VIEW SECTION TITLE */}
      {selectedEmployee && (
        <h3 className="text-xl font-semibold text-gray-700">
          Attendance Overview
        </h3>
      )}

      {/* SUMMARY */}
      {selectedEmployee && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <p className="text-gray-500 text-sm">Total Present Days</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {summary.total_present_days}
            </p>
          </Card>

          <Card>
            <p className="text-gray-500 text-sm">Total Absent Days</p>
            <p className="text-4xl font-bold text-red-500 mt-2">
              {summary.total_absent_days}
            </p>
          </Card>
        </div>
      )}

      {/* FILTER */}
      {selectedEmployee && (
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
           <div className="relative">
  <input
    type="date"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
    onClick={(e) => {
      const input = e.currentTarget;
      if (input.showPicker) {
        input.showPicker();
      }
    }}
    className="
      w-full
      bg-white
      text-gray-900
      border border-gray-300
      rounded-xl px-4 py-3 pr-10
      focus:ring-2 focus:ring-blue-500
      focus:outline-none
      transition-all
      cursor-pointer
    "
  />
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
    📅
  </span>
</div>


            <button
              onClick={() => setFilterDate("")}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Filter
            </button>
          </div>
        </Card>
      )}

      {/* TABLE */}
      <Card>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : attendanceList.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No attendance records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-gray-800 border-separate border-spacing-y-2">
              <thead>
                <tr className="text-sm uppercase text-gray-500">
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((att) => (
                  <motion.tr
                    key={att.id}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white shadow-sm rounded-xl"
                  >
                    <td className="px-4 py-4 font-medium">{att.date}</td>
                    <td
                      className={`px-4 py-4 font-semibold ${
                        att.status === "Present"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {att.status}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default AttendancePage;
