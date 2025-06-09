import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useMarkEntry() {
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

  // Fetch classes
  useEffect(() => {
    axios.get('http://localhost:5000/api/classes', { withCredentials: true })
      .then(res => setClasses(res.data))
      .catch(err => setError('Failed to fetch classes: ' + err.message));
  }, []);

  // Fetch subjects for selected class
  useEffect(() => {
    if (!selectedClass) return;
    setSelectedSubject('');
    setSubjects([]);
    axios.get(`http://localhost:5000/api/subjects/for-class/${selectedClass}`, { withCredentials: true })
      .then(res => setSubjects(res.data))
      .catch(err => setError('Failed to fetch subjects: ' + err.message));
  }, [selectedClass]);

  // Fetch exams for selected subject (class_subject_id)
  useEffect(() => {
    if (!selectedSubject) return;
    setExams([]);
    axios.get(`http://localhost:5000/api/exams/for-class-subject/${selectedSubject}`, { withCredentials: true })
      .then(res => setExams(res.data))
      .catch(err => setError('Failed to fetch exams: ' + err.message));
  }, [selectedSubject]);

  // Fetch students for selected class
  useEffect(() => {
    if (!selectedClass) return;
    setStudents([]);
    axios.get(`http://localhost:5000/api/students/for-class/${selectedClass}`, { withCredentials: true })
      .then(res => setStudents(res.data))
      .catch(err => setError('Failed to fetch students: ' + err.message));
  }, [selectedClass]);

  // Fetch marks for selected subject (class_subject_id) and exam
  useEffect(() => {
    if (!selectedSubject || !selectedExam || !students.length) return;
    setIsLoading(true);
    axios.get(`http://localhost:5000/api/marks/entry-status?class_subject_id=${selectedSubject}&exam_id=${selectedExam}`, { withCredentials: true })
      .then(res => {
        const existingMarks = res.data;
        setMarksData(students.map(student => ({
          student_id: student.student_id,
          name: student.name,
          marks_obtained: existingMarks.find(m => m.student_id === student.student_id)?.marks_obtained || ''
        })));
      })
      .catch(() => {
        setMarksData(students.map(student => ({
          student_id: student.student_id,
          name: student.name,
          marks_obtained: ''
        })));
      })
      .finally(() => setIsLoading(false));
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
        setError('Please enter marks for at least one student');
        return false;
      }
      const payload = {
        class_subject_id: selectedSubject,
        exam_id: selectedExam,
        marks: validMarks
      };
      const response = await axios.post('http://localhost:5000/api/marks', payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response.status === 200 || response.status === 201;
    } catch (err) {
      setError('Failed to submit marks' + err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
