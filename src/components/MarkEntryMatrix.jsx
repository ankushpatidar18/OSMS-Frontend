import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ApiUrl = import.meta.env.VITE_BASE_URL;

const sessions = [
  '2023-2024','2024-2025','2025-2026','2026-2027','2027-2028',
  '2028-2029','2029-2030','2030-2031','2031-2032','2032-2033','2033-2034'
];

export default function MarksEntryMatrix() {
  const [classes, setClasses] = useState([]);
  const [selectedSession, setSelectedSession] = useState('2024-2025');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [marks, setMarks] = useState({});
  const [existingMarks, setExistingMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogType, setDialogType] = useState("info");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/matrix/classes`, { withCredentials: true })
      .then(res => setClasses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setClasses([]));
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSession) {
      axios
        .get(`${ApiUrl}/matrix/students?class=${selectedClass}&session=${selectedSession}`, { withCredentials: true })
        .then(res => setStudents(res.data));
    }
  }, [selectedClass, selectedSession]);

  useEffect(() => {
    if (selectedClass && selectedSession && selectedStudent) {
      axios
        .get(`${ApiUrl}/matrix/subjects/${selectedClass}`, { withCredentials: true })
        .then(res => setSubjects(res.data));
      axios
        .get(`${ApiUrl}/matrix/exams/${selectedClass}/${selectedSession}`, { withCredentials: true })
        .then(res => setExams(res.data));
      axios
        .get(`${ApiUrl}/matrix/marks?student_id=${selectedStudent}`, { withCredentials: true })
        .then(res => setExistingMarks(res.data));
    }
  }, [selectedStudent, selectedClass, selectedSession]);

  useEffect(() => {
    const prefilled = {};
    for (let mark of existingMarks) {
      prefilled[`${mark.class_subject_id}-${mark.exam_id}`] = mark.marks_obtained;
    }
    setMarks(prefilled);
  }, [existingMarks]);

  const handleInput = (subjectId, examId, value) => {
    setMarks(prev => ({
      ...prev,
      [`${subjectId}-${examId}`]: value
    }));
  };

  const handleSubmit = async () => {
    if (!selectedStudent || !subjects.length || !exams.length) {
      setDialogMsg("Please select class, session, student, and ensure subjects & exams are available.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }
    setLoading(true);
    try {
      const payload = subjects.flatMap(subject => exams.map(exam => ({
        class_subject_id: subject.class_subject_id,
        exam_id: exam.exam_id,
        marks_obtained: parseFloat(marks[`${subject.class_subject_id}-${exam.exam_id}`]) || 0
      })));
      await axios.post(
        `${ApiUrl}/matrix/marks`,
        {
          student_id: selectedStudent,
          marks: payload,
          recorded_by: 1
        },
        { withCredentials: true }
      );
      setDialogMsg('Marks saved successfully!');
      setDialogType("success");
      setDialogOpen(true);
    } catch (err) {
      setDialogMsg('Failed to save marks. Please try again.' + err.message);
      setDialogType("error");
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <Select onValueChange={setSelectedSession} value={selectedSession}>
            <SelectTrigger>
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map(session => (
                <SelectItem key={session} value={session}>{session}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedClass} value={selectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {(Array.isArray(classes) ? classes : []).map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedStudent} value={selectedStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              {students.map(std => (
                <SelectItem key={std.student_id} value={std.student_id}>
                  {std.roll_number}. {std.name} ({std.father_name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {subjects.length > 0 && exams.length > 0 ? (
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Subject</th>
                {exams.map(exam => (
                  <th key={exam.exam_id} className="p-2 border text-center">{exam.name} ({exam.total_marks})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => (
                <tr key={subject.class_subject_id} className="even:bg-gray-50">
                  <td className="p-2 border font-medium">{subject.subject_name}</td>
                  {exams.map(exam => (
                    <td key={exam.exam_id} className="p-2 border text-center">
                      <Input
                        className="w-20 text-center"
                        aria-label={`Marks for ${subject.subject_name} in ${exam.name}`}
                        value={marks[`${subject.class_subject_id}-${exam.exam_id}`] || ''}
                        onChange={e => handleInput(subject.class_subject_id, exam.exam_id, e.target.value)}
                        type="number"
                        min="0"
                        max={exam.total_marks}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedStudent && (
          <div className="text-center text-gray-500">
            No subjects or exams found for this class/session/student.
          </div>
        )
      )}

      {selectedStudent && (
        <div className="text-right">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Marks"}
          </Button>
        </div>
      )}

      {/* Dialog for feedback */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "success" ? "Success" : dialogType === "error" ? "Error" : "Info"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">{dialogMsg}</div>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
