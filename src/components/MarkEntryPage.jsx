import { useState, useEffect } from "react";
import useMarkEntry from "../hooks/useMarkEntry";
import SessionSelector from "./mark_entry_components/SessionSelector";
import ClassSelector from "./mark_entry_components/classSelector";
import SubjectExamSelector from "./mark_entry_components/subjectExamSelector";
import MarksTable from "./mark_entry_components/marksTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitMarks();
    if (success) {
      setSuccessMessage("Marks submitted successfully!");
      setDialogOpen(true);
    }
    setIsSubmitting(false);
  };

  // Automatically close dialog after 3 seconds
  useEffect(() => {
    if (dialogOpen) {
      const timer = setTimeout(() => setDialogOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [dialogOpen]);

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
            const student = students.find((s) => s.student_id === md.student_id);
            return { ...md, name: student ? student.name : "", dob: student ? student.dob : "" };
          })}
          handleMarkChange={handleMarkChange}
          isLoading={isLoading}
        />

        {/* Submit Button */}
        <Button
          className="mt-4 px-6 py-2"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            isLoading ||
            !selectedSession ||
            !selectedClass ||
            !selectedSubject ||
            !selectedExam ||
            marksData.length === 0
          }
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Marks"}
        </Button>

        {/* Feedback Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Success</DialogTitle>
            </DialogHeader>
            <div className="py-4" aria-live="polite">
              {successMessage}
            </div>
            <DialogFooter>
              <Button onClick={() => setDialogOpen(false)}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 mt-2" aria-live="polite">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
