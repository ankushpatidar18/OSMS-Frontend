import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentRow from "./StudentRow";

const StudentsTable = ({
  students,
  loading,
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
}) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
      <CardTitle className="text-lg">
        Students List ({students.length} students)
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      {loading ? (
        <div
          className="flex justify-center items-center h-64 bg-white"
          aria-live="polite"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg font-medium text-gray-600">
              Loading students...
            </div>
          </div>
        </div>
      ) : students.length === 0 ? (
        <div
          className="flex justify-center items-center h-64 bg-white"
          aria-live="polite"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <div className="text-lg font-medium text-gray-500">
              No students found
            </div>
            <div className="text-sm text-gray-400">
              Try adjusting your search filters
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto">
          {students.map((student, index) => (
            <StudentRow
              key={student.student_id}
              student={student}
              index={index}
              editingId={editingId}
              editData={editData}
              isExpanded={isExpanded}
              classOptions={classOptions}
              startEdit={startEdit}
              cancelEdit={cancelEdit}
              handleEditChange={handleEditChange}
              saveChanges={saveChanges}
              toggleExpand={toggleExpand}
              formatDateForDisplay={formatDateForDisplay}
            />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

export default StudentsTable;
