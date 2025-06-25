import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SubjectExamSelector({
  subjects,
  exams,
  selectedSubject,
  setSelectedSubject,
  selectedExam,
  setSelectedExam,
  isLoading,
}) {
  const hasSubjects = subjects && subjects.length > 0;
  const hasExams = exams && exams.length > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="subject-selector" className="block text-sm font-semibold text-gray-700 mb-2">
          Select Subject
        </label>
        <Select
          value={selectedSubject}
          onValueChange={setSelectedSubject}
          disabled={isLoading || !hasSubjects}
        >
          <SelectTrigger
            id="subject-selector"
            className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
            aria-busy={isLoading}
            aria-describedby={!hasSubjects ? "no-subjects-msg" : undefined}
          >
            <SelectValue
              placeholder={isLoading ? "Loading subjects..." : "Select a subject"}
              className="text-gray-500"
            />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
            {isLoading ? (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            ) : hasSubjects ? (
              subjects.map((subj) => (
                <SelectItem
                  key={subj.class_subject_id}
                  value={String(subj.class_subject_id)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                >
                  {subj.subject_name}
                </SelectItem>
              ))
            ) : (
              <div id="no-subjects-msg" className="px-4 py-2 text-gray-500">
                No subjects available
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="exam-selector" className="block text-sm font-semibold text-gray-700 mb-2">
          Select Exam
        </label>
        <Select
          value={selectedExam}
          onValueChange={setSelectedExam}
          disabled={isLoading || !hasExams}
        >
          <SelectTrigger
            id="exam-selector"
            className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
            aria-busy={isLoading}
            aria-describedby={!hasExams ? "no-exams-msg" : undefined}
          >
            <SelectValue
              placeholder={isLoading ? "Loading exams..." : "Select an exam"}
              className="text-gray-500"
            />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
            {isLoading ? (
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            ) : hasExams ? (
              exams.map((exam) => (
                <SelectItem
                  key={exam.exam_id}
                  value={String(exam.exam_id)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                >
                  {exam.name} ({exam.session})
                </SelectItem>
              ))
            ) : (
              <div id="no-exams-msg" className="px-4 py-2 text-gray-500">
                No exams available
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
