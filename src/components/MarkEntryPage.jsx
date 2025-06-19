import { useState } from "react";
import useMarkEntry from "../hooks/useMarkEntry";
import SessionSelector from "./MarkEntry/SessionSelector";
import ClassSelector from "./MarkEntry/classSelector";
import SubjectExamSelector from "./MarkEntry/subjectExamSelector";
import MarksTable from "./MarkEntry/marksTable";

export default function MarkEntryPage() {
  const {
    selectedSession,
    setSelectedSession,
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
    error,
  } = useMarkEntry();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitMarks();
    if (success) {
      setSuccessMessage("Marks submitted successfully!");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Session Selector */}
        <SessionSelector
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          isLoading={isLoading}
        />

        {/* Class Selector */}
        <ClassSelector
          classes={classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          isLoading={isLoading || !selectedSession}
        />

        {/* Subject & Exam Selector */}
        <SubjectExamSelector
          subjects={subjects}
          exams={exams}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          isLoading={isLoading || !selectedClass}
        />

        {/* Marks Table */}
        <MarksTable
          marksData={marksData.map((md) => {
            // Attach student name from students array if available
            const student = students.find((s) => s.student_id === md.student_id);
            return { ...md, name: student ? student.name : "" ,dob : student ? student.dob : ""};
          })}
          handleMarkChange={handleMarkChange}
          isLoading={isLoading}
        />

        {/* Submit Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            isLoading ||
            !selectedSession ||
            !selectedClass ||
            !selectedSubject ||
            !selectedExam
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Marks"}
        </button>
        {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}
