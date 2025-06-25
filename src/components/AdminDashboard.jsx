import { NavLink, Outlet } from "react-router-dom";

const sidebarLinks = [
  { to: "upload-students", label: "Upload Students" },
  { to: "admit-card", label: "Admit Card" },
  { to: "students", label: "Students" },
  { to: "marksheet", label: "Marksheet" },
  { to: "mark-entry", label: "MarksEntry" },
  { to: "add-student", label: "Add Student" },
  { to: "delete-student", label: "Remove Student" },
  { to: "promote-students", label: "Promote Students" },
  { to: "mark-entry-matrix", label: "MarksEntry(Matrix)" },
  { to: "exam-schedule", label: "Exam Schedule" },
];

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white text-gray-900 p-6 shadow-lg" aria-label="Admin Sidebar">
        <ul className="space-y-1">
          {sidebarLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block p-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-blue-50 hover:text-blue-700"
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Area */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
