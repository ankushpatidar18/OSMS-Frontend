"use client"

import { NavLink, Outlet } from "react-router-dom"
import {
  Upload,
  CreditCard,
  Users,
  FileText,
  PenTool,
  UserPlus,
  UserMinus,
  TrendingUp,
  Grid3X3,
  Calendar,
  GraduationCap,
} from "lucide-react"

const sidebarLinks = [
  { to: "upload-students", label: "Upload Students", icon: Upload },
  { to: "admit-card", label: "Admit Card", icon: CreditCard },
  { to: "students", label: "Students", icon: Users },
  { to: "marksheet", label: "Marksheet", icon: FileText },
  { to: "mark-entry", label: "Marks Entry", icon: PenTool },
  { to: "add-student", label: "Add Student", icon: UserPlus },
  { to: "delete-student", label: "Remove Student", icon: UserMinus },
  { to: "promote-students", label: "Promote Students", icon: TrendingUp },
  { to: "mark-entry-matrix", label: "Marks Entry (Matrix)", icon: Grid3X3 },
  { to: "exam-schedule", label: "Exam Schedule", icon: Calendar },
]

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-full lg:w-72 bg-white border-r border-gray-200 shadow-sm" aria-label="Admin Sidebar">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
              <p className="text-sm text-gray-500">School Management</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const IconComponent = link.icon
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
              )
            })}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t border-gray-100 bg-white">
          <div className="text-center">
            <p className="text-xs text-gray-400">School Management System</p>
            <p className="text-xs text-gray-400 mt-1">v1.0.0</p>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
