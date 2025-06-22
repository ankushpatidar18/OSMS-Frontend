import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white text-gray-900 p-6 shadow-lg">
        
        <NavLink
          to="upload-students"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Upload Students
        </NavLink>
        <NavLink
          to="admit-card"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Admit Card
        </NavLink>
        <NavLink
          to="students"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Students
        </NavLink>
        <NavLink
          to="marksheet"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Marksheet
        </NavLink>
        <NavLink
          to="mark-entry"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          MarksEntry
        </NavLink>
        <NavLink
          to="add-student"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Add Student
        </NavLink>
        <NavLink
          to="delete-student"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Remove Student
        </NavLink>
        <NavLink
          to="promote-students"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Promote Students
        </NavLink>
        <NavLink
          to="mark-entry-matrix"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          MarksEntry(Matrix)
        </NavLink>
        <NavLink
          to="exam-schedule"
          className={({ isActive }) =>
            `block p-3 rounded-md transition-colors duration-200 ${
              isActive
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          Exam Schedule
        </NavLink>
      </div>
      

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
