import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white text-black p-4 space-y-4">
        <NavLink
          to="upload-students"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Upload Students
        </NavLink>
        <NavLink
          to="select-class"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Admit Card
        </NavLink>
        <NavLink
          to="students"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Students
        </NavLink>
        <NavLink
          to="marksheet"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Marksheet
        </NavLink>
        <NavLink
          to="mark-entry"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          MarksEntry
        </NavLink>
        <NavLink
          to="add-student"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Add Student
        </NavLink>
        <NavLink
          to="remove-student"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`
          }
        >
          Remove Student
        </NavLink>
        {/* Add more menu items here */}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
