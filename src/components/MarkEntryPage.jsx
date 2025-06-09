import { useState } from 'react';
import useMarkEntry from '../hooks/useMarkEntry';
import ClassSelector from '../components/MarkEntry/ClassSelector';
import SubjectExamSelector from '../components/MarkEntry/SubjectExamSelector';
import MarksTable from '../components/MarkEntry/MarksTable';

export default function MarkEntryPage() {
  const {
    classes,
    selectedClass,
    setSelectedClass,
    subjects,
    selectedSubject,
    setSelectedSubject,
    exams,
    selectedExam,
    setSelectedExam,
    students,
    marksData,
    handleMarkChange,
    submitMarks,
    isLoading,
    error
  } = useMarkEntry();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitMarks();
    setIsSubmitting(false);
    if (success) {
      alert('Marks saved successfully!');
    } else {
      alert(error || 'Failed to save marks');
    }
  };

  return (
    <div>
      <h1>Student Mark Entry</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ClassSelector
        classes={classes}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        isLoading={isLoading}
      />
      <SubjectExamSelector
        subjects={subjects}
        exams={exams}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedExam={selectedExam}
        setSelectedExam={setSelectedExam}
        isLoading={isLoading}
      />
      {students.length > 0 && (
        <>
          <MarksTable
            marksData={marksData}
            handleMarkChange={handleMarkChange}
            isLoading={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedSubject || !selectedExam}
          >
            {isSubmitting ? 'Saving...' : 'Save Marks'}
          </button>
        </>
      )}
    </div>
  );
}
