import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Hash } from "lucide-react"

export default function MarksTable({ marksData, handleMarkChange, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!marksData || marksData.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-gray-400 mb-4">
          <User className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Students Found</h3>
          <p className="text-sm text-gray-500">Please select class, subject, and exam to view students</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-4">
            <Hash className="h-4 w-4" />
            <span>{marksData.length} Students</span>
          </div>
          {marksData.map((item, index) => (
            <div
              key={item.student_id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">Student #{index + 1}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">Enter Marks</label>
                <Input
                  // type="number"
                  // onWheel={(e) => e.preventDefault()}
                  // min="0"
                  value={item.marks_obtained || ""}
                  disabled={isLoading}
                  onChange={(e) => handleMarkChange(item.student_id, e.target.value)}
                  placeholder="Enter marks"
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                Marks Obtained
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {marksData.map((item, index) => (
              <tr
                key={item.student_id}
                className={`hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">Student ID: {item.student_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center">
                    <Input
                      // type="number"
                      // onWheel={(e) => e.preventDefault()}
                      // min="0"
                      value={item.marks_obtained || ""}
                      disabled={isLoading}
                      onChange={(e) => handleMarkChange(item.student_id, e.target.value)}
                      placeholder="Enter marks"
                      className="w-24 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Students: {marksData.length}</span>
          <span className="text-xs">Enter marks and click save to submit</span>
        </div>
      </div>
    </div>
  )
}
