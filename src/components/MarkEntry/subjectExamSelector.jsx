import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubjectExamSelector({
  subjects,
  exams,
  selectedSubject,
  setSelectedSubject,
  selectedExam,
  setSelectedExam,
  isLoading,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Subject Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Subject</label>
        {isLoading ? (
          <Skeleton className="h-11 w-full rounded-lg" />
        ) : (
          <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!subjects.length}>
            <SelectTrigger className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed">
              <SelectValue placeholder="Select a subject" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {(subjects || []).map((subject) => (
                <SelectItem
                  key={subject.class_subject_id}
                  value={subject.class_subject_id}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{subject.subject_name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {!subjects.length && !isLoading && <p className="text-xs text-gray-500 mt-1">Please select a class first</p>}
      </div>

      {/* Exam Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Exam</label>
        {isLoading ? (
          <Skeleton className="h-11 w-full rounded-lg" />
        ) : (
          <Select value={selectedExam} onValueChange={setSelectedExam} disabled={!exams.length}>
            <SelectTrigger className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed">
              <SelectValue placeholder="Select an exam" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {(exams || []).map((exam) => (
                <SelectItem
                  key={exam.exam_id}
                  value={exam.exam_id}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{exam.name}</span>
                    <span className="text-xs text-gray-500">Max Marks: {exam.total_marks}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {!exams.length && !isLoading && <p className="text-xs text-gray-500 mt-1">Please select a subject first</p>}
      </div>
    </div>
  )
}
