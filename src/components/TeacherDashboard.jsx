import { NavLink, Outlet } from "react-router-dom";
import { PenTool, Grid3X3, GraduationCap } from "lucide-react";

const sidebarLinks = [
  { to: "mark-entry", label: "Marks Entry", icon: PenTool },
  { to: "mark-entry-matrix", label: "Marks Entry (Matrix)", icon: Grid3X3 },
];

const TeacherDashboard = () => (
  <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
    <nav className="w-full lg:w-72 bg-white border-r border-gray-200 shadow-sm" aria-label="Teacher Sidebar">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Teacher Panel</h2>
            <p className="text-sm text-gray-500">School Management</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-transparent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <IconComponent
                        className={`h-5 w-5 transition-colors duration-200 ${
                          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <span className="font-medium text-sm">{link.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto p-4 border-t border-gray-100 bg-white">
        <div className="text-center">
          <p className="text-xs text-gray-400">School Management System</p>
          <p className="text-xs text-gray-400 mt-1">v1.0.0</p>
        </div>
      </div>
    </nav>
    <main className="flex-1 overflow-auto">
      <div className="p-6">
        <Outlet />
      </div>
    </main>
  </div>
);

export default TeacherDashboard;