export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
}
