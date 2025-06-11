export default function SubjectExamSelector({
  subjects,
  exams,
  selectedSubject,
  setSelectedSubject,
  selectedExam,
  setSelectedExam,
  isLoading
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label>Select Subject</label>
        <select
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          disabled={isLoading || !subjects.length}
        >
          <option value="">Select a subject</option>
          {(subjects || []).map(subject => (
            <option key={subject.class_subject_id} value={subject.class_subject_id}>
              {subject.subject_name} 
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Exam</label>
        <select
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          disabled={isLoading || !exams.length}
        >
          <option value="">Select an exam</option>
          {(exams || []).map(exam => (
            <option key={exam.exam_id} value={exam.exam_id}>
              {exam.name} (Max : {exam.total_marks})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
