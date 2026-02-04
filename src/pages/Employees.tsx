import { useEffect, useState } from "react";
import api from "../services/api";
import type { Employee } from "../types/employee";
import Card from "../components/ui/Card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch {
      toast.error("Failed to load employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/employees", form);

      toast.success("Employee added successfully 🎉");

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      fetchEmployees();
    } catch (err: any) {
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;

        if (Array.isArray(detail)) {
          toast.error(detail[0].msg);
        } else {
          toast.error(detail);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10 text-gray-800"
    >
      <h2 className="text-3xl font-bold">
        Employee Management
      </h2>

      {/* Form Card */}
      <Card>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {["employee_id", "full_name", "email", "department"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.replace("_", " ").toUpperCase()}
              value={(form as any)[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              required
              className="
                bg-white/80
                text-gray-900
                placeholder:text-gray-400
                backdrop-blur-sm
                border border-gray-200
                rounded-xl
                px-4 py-3
                focus:ring-2 focus:ring-blue-500
                focus:outline-none
                transition-all duration-200
              "
            />
          ))}

          <button
            type="submit"
            className="
              sm:col-span-2
              bg-blue-600
              text-white
              py-3
              rounded-xl
              hover:bg-blue-700
              active:scale-95
              transition-all duration-200
              shadow-md
            "
          >
            Add Employee
          </button>
        </form>
      </Card>

      {/* Table Card */}
      <Card>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ) : employees.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No employees added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-800">
              <thead>
                <tr className="border-b border-gray-200 text-sm uppercase text-gray-500">
                  <th className="py-4 px-2">ID</th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Email</th>
                  <th className="px-2">Department</th>
                  <th className="px-2"></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <motion.tr
                    key={emp.id}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-2 font-medium">
                      {emp.employee_id}
                    </td>
                    <td className="px-2">{emp.full_name}</td>
                    <td className="px-2 text-gray-700">
                      {emp.email}
                    </td>
                    <td className="px-2">{emp.department}</td>
                    <td className="px-2">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="
                          text-red-500
                          hover:text-red-700
                          transition
                          font-medium
                        "
                      >
                        Delete
                      </button>
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

export default Employees;
