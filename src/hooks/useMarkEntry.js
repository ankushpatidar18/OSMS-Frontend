import { useState, useEffect } from "react";
import axios from "axios";
const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function useMarkEntry() {
  const [selectedSession, setSelectedSession] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset selections when session changes
  useEffect(() => {
    setSelectedClass('');
    setSubjects([]);
    setSelectedSubject('');
    setExams([]);
    setSelectedExam('');
    setStudents([]);
    setMarksData([]);
  }, [selectedSession]);

  // Fetch classes for selected session
  useEffect(() => {
    if (!selectedSession) {
      setClasses([]);
      return;
    }
    axios.get(`${ApiUrl}/classes`, {
      params: { session: selectedSession },
      withCredentials: true
    })
      .then(res => setClasses(res.data))
      .catch(() => setClasses([]));
  }, [selectedSession]);

  // Fetch subjects for selected class and session
  useEffect(() => {
    if (selectedClass && selectedSession) {
      axios.get(`${ApiUrl}/subjects/for-class/${selectedClass}`, {
        params: { session: selectedSession },
        withCredentials: true
      })
        .then(res => setSubjects(res.data))
        .catch(() => setSubjects([]));
    } else {
      setSubjects([]);
    }
  }, [selectedClass, selectedSession]);

  // Fetch exams for selected subject (class_subject_id)
  useEffect(() => {
    if (selectedSubject) {
      axios.get(`${ApiUrl}/exams/for-class-subject/${selectedSubject}`, {
        withCredentials: true
      })
        .then(res => setExams(res.data))
        .catch(() => setExams([]));
    } else {
      setExams([]);
    }
  }, [selectedSubject]);

  // Fetch students for selected class and session
  useEffect(() => {
    if (selectedClass && selectedSession) {
      axios.get(`${ApiUrl}/students/for-class/${selectedClass}`, {
        params: { session: selectedSession },
        withCredentials: true
      })
        .then(res => setStudents(res.data))
        .catch(() => setStudents([]));
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSession]);

  // Fetch marks for selected subject (class_subject_id) and exam
  useEffect(() => {
    if (selectedSubject && selectedExam && students.length > 0) {
      axios.get(`${ApiUrl}/marks/entry-status`, {
        params: { class_subject_id: selectedSubject, exam_id: selectedExam },
        withCredentials: true
      })
        .then(res => {
          // Map marks by student_id for quick lookup
          const marksMap = {};
          res.data.forEach(m => { marksMap[m.student_id] = m.marks_obtained; });
          // Merge students with marks
          setMarksData(
            students.map(s => ({
              student_id: s.student_id,
              name: s.name,
              marks_obtained: marksMap[s.student_id] ?? ""
            }))
          );
        })
        .catch(() => {
          // On error, still show all students with empty marks
          setMarksData(
            students.map(s => ({
              student_id: s.student_id,
              name: s.name,
              marks_obtained: ""
            }))
          );
        });
    } else {
      setMarksData([]);
    }
  }, [selectedSubject, selectedExam, students]);

  const handleMarkChange = (studentId, value) => {
    setMarksData(prev =>
      prev.map(item =>
        item.student_id === studentId
          ? { ...item, marks_obtained: value }
          : item
      )
    );
  };
const submitMarks = async () => {
  if (!selectedSubject || !selectedExam) {
    setError('Please select subject and exam');
    return false;
  }
  setIsLoading(true);
  setError(null);
  try {
    const validMarks = marksData
      .filter(item => item.marks_obtained !== '' && !isNaN(parseFloat(item.marks_obtained)))
      .map(item => ({
        student_id: item.student_id,
        marks_obtained: parseFloat(item.marks_obtained)
      }));
    if (validMarks.length === 0) {
      setError('No valid marks to submit');
      setIsLoading(false);
      return false;
    }
    const payload = {
      class_subject_id: selectedSubject,
      exam_id: selectedExam,
      marks: validMarks
    };
    await axios.post(`${ApiUrl}/marks`, payload, { withCredentials: true });
    setIsLoading(false);
    setError(null); // <-- clear error on success
    return true;
  } catch (err) {
    setError('Failed to submit marks: ' + (err?.response?.data?.message || err.message));
    setIsLoading(false);
    return false;
  }
};


  return {
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
    error
  };
}
