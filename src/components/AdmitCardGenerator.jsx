import React, { useState, useEffect } from 'react';
import { getClasses, getExams, getAdmitCardData } from '../utils/api';
import AdmitCardPreview from './AdmitCardPreview';

const SESSION_OPTIONS = [
  "2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028",
  "2028-2029", "2029-2030", "2030-2031", "2031-2032", "2032-2033", "2033-2034"
];

export default function AdmitCardGenerator() {
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [admitData, setAdmitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDropdowns, setFetchingDropdowns] = useState(true);
  const [error, setError] = useState('');

  // Fetch classes and exams on mount
  useEffect(() => {
    setFetchingDropdowns(true);
    Promise.all([getClasses(), getExams()])
      .then(([classRes, examRes]) => {
        setClasses(classRes.data || []);
        setExams(examRes.data || []);
        setError('');
      })
      .catch(() => setError('Failed to load classes or exams.'))
      .finally(() => setFetchingDropdowns(false));
  }, []);

  // Handle admit card generation
  const handleGenerate = async () => {
    if (!selectedSession || !selectedClass || !selectedExam) return;
    setLoading(true);
    setError('');
    setAdmitData(null);
    try {
      const res = await getAdmitCardData(selectedClass, selectedExam, selectedSession);
      setAdmitData(res.data);
    } catch (err) {
      setError('Failed to fetch admit card data.' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Generate Admit Cards</h2>

      <div className="flex gap-4 mb-4">
        {/* Session Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedSession}
          onChange={e => setSelectedSession(e.target.value)}
          aria-label="Select Session"
        >
          <option value="">Select Session</option>
          {SESSION_OPTIONS.map(session => (
            <option key={session} value={session}>{session}</option>
          ))}
        </select>

        {/* Class Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          aria-label="Select Class"
          disabled={fetchingDropdowns}
        >
          <option value="">Select Class</option>
          {classes.map(c => (
            <option key={c.class} value={c.class}>{c.class}</option>
          ))}
        </select>

        {/* Exam Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          aria-label="Select Exam"
          disabled={fetchingDropdowns}
        >
          <option value="">Select Exam</option>
          {exams.map(e => (
            <option key={e.exam_id} value={e.exam_id}>
              {e.name} ({e.session})({e.class_group})
            </option>
          ))}
        </select>

        {/* Generate Button */}
        <button
          className={`px-4 py-2 rounded text-white ${loading || fetchingDropdowns || !selectedSession || !selectedClass || !selectedExam ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handleGenerate}
          disabled={loading || fetchingDropdowns || !selectedSession || !selectedClass || !selectedExam}
          aria-disabled={loading || fetchingDropdowns || !selectedSession || !selectedClass || !selectedExam}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {/* Admit Card Preview */}
      {admitData && <AdmitCardPreview data={admitData} />}
    </div>
  );
}
