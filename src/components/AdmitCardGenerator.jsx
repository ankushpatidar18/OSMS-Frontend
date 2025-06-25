import React, { useState, useEffect } from 'react';
import { getClasses, getExams, getAdmitCardData } from '../utils/api';
import AdmitCardPreview from './AdmitCardPreview';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!selectedSession || !selectedClass || !selectedExam) return;
    setLoading(true);
    setError('');
    setAdmitData(null);
    try {
      const res = await getAdmitCardData(selectedClass, selectedExam, selectedSession);
      setAdmitData(res.data);
    } catch (err) {
      setError('Failed to fetch admit card data.' + (err.message ? ` (${err.message})` : ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-4 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Generate Admit Cards</h2>

      <form className="flex flex-wrap gap-4 mb-4 items-end" onSubmit={handleGenerate}>
        {/* Session Dropdown */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium mb-1">Session<span className="text-red-500">*</span></label>
          <Select
            value={selectedSession}
            onValueChange={setSelectedSession}
            disabled={fetchingDropdowns}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder={fetchingDropdowns ? "Loading..." : "Select Session"} />
            </SelectTrigger>
            <SelectContent>
              {SESSION_OPTIONS.map(session => (
                <SelectItem key={session} value={session}>{session}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class Dropdown */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium mb-1">Class<span className="text-red-500">*</span></label>
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
            disabled={fetchingDropdowns}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder={fetchingDropdowns ? "Loading..." : "Select Class"} />
            </SelectTrigger>
            <SelectContent>
              {classes.map(c => (
                <SelectItem key={c.class} value={c.class}>{c.class}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exam Dropdown */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium mb-1">Exam<span className="text-red-500">*</span></label>
          <Select
            value={selectedExam}
            onValueChange={setSelectedExam}
            disabled={fetchingDropdowns}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder={fetchingDropdowns ? "Loading..." : "Select Exam"} />
            </SelectTrigger>
            <SelectContent>
              {exams.map(e => (
                <SelectItem key={e.exam_id} value={e.exam_id}>
                  {e.name} ({e.session}) ({e.class_group})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button
          type="submit"
          className="h-11"
          disabled={loading || fetchingDropdowns || !selectedSession || !selectedClass || !selectedExam}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 mb-2" aria-live="polite">
          {error}
        </div>
      )}

      {/* Admit Card Preview */}
      {admitData && <AdmitCardPreview data={admitData} />}
    </div>
  );
}
