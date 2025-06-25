import { useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import StudentDetails from "./StudentDetails";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 

const StudentRow = ({
  student,
  index,
  editingId,
  editData,
  isExpanded,
  classOptions,
  startEdit,
  cancelEdit,
  handleEditChange,
  saveChanges,
  toggleExpand,
  formatDateForDisplay,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  return (
    <div
      className={`border-b border-gray-200 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-blue-50 transition-colors duration-150`}
    >
      {/* Summary Row */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {/* Name */}
              <div className="flex-1 min-w-0">
                {editingId === student.student_id ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => handleEditChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Student Name"
                    required
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {student.name || "No Name"}
                  </h3>
                )}
              </div>
              {/* Class & Roll */}
              <div className="flex gap-2 flex-wrap">
                {editingId === student.student_id ? (
                  <>
                    <select
                      value={editData.class}
                      onChange={e => handleEditChange("class", e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Class</option>
                      {classOptions.map(cls => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editData.roll_number}
                      onChange={e => handleEditChange("roll_number", e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Roll No"
                      required
                    />
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Class {student.class || "-"}
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      Roll: {student.roll_number || "-"}
                    </span>
                  </>
                )}
              </div>
            </div>
            {/* Quick Info */}
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
              <span>📱 {student.mobile_number || "No Mobile"}</span>
              <span>👤 {student.gender || "No Gender"}</span>
              <span>📅 {formatDateForDisplay(student.dob) || "No DOB"}</span>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2">
            {editingId === student.student_id ? (
              <>
                <button
                  onClick={() => saveChanges(student.student_id)}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200"
                  title="Save Changes"
                >
                  <Save className="h-5 w-5" />
                </button>
                {/* Cancel Edit with shadcn Dialog */}
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <button
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                      title="Cancel Edit"
                      type="button"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Discard changes?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel editing? All unsaved changes will be lost.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                        type="button"
                        onClick={() => setShowCancelDialog(false)}
                      >
                        Continue Editing
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                        type="button"
                        onClick={() => {
                          setShowCancelDialog(false);
                          cancelEdit();
                        }}
                      >
                        Discard Changes
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <button
                onClick={() => startEdit(student)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                title="Edit Student"
              >
                <Edit2 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => toggleExpand(student.student_id)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title={isExpanded[student.student_id] ? "Collapse Details" : "Expand Details"}
            >
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  isExpanded[student.student_id] ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded[student.student_id] && (
        <StudentDetails
          student={student}
          editing={editingId === student.student_id}
          editData={editData}
          handleEditChange={handleEditChange}
          formatDateForDisplay={formatDateForDisplay}
        />
      )}
    </div>
  );
};

export default StudentRow;
