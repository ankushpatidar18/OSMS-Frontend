import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import axios from 'axios';
import MarksheetPreview from './MarksheetPreview';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function MarksheetGenerator() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [session, setSession] = useState('2024-2025');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // PDF feedback states
  const [pdfLoading, setPdfLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");

  // Fetch available classes on mount
  useEffect(() => {
    axios.get(`${ApiUrl}/classes`, { withCredentials: true })
      .then(res => setClasses(res.data))
      .catch(err => setError('Failed to fetch classes: ' + err.message));
  }, []);

  // Fetch students when class and session are selected
  const fetchStudents = async () => {
    if (!selectedClass || !session) {
      setError('Please select both class and session');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${ApiUrl}/marksheets/marksheet/${selectedClass}/${session}`,
        { withCredentials: true }
      );

      setStudents(response.data);
      setSelectedStudents(response.data); // Select all by default

      if (response.data.length === 0) {
        setError('No students found for the selected class and session');
      }
    } catch (err) {
      setError('Failed to fetch student data: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelection = (student) => {
    const isSelected = selectedStudents.find(s => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const selectAllStudents = () => {
    setSelectedStudents([...students]);
  };

  const deselectAllStudents = () => {
    setSelectedStudents([]);
  };

  // Handles PDF feedback and loading state
  const handlePDFGeneration = async (generatePDF) => {
    setPdfLoading(true);
    try {
      await generatePDF();
      setDialogMsg("PDF generated and downloaded successfully!");
      setDialogOpen(true);
    } catch (err) {
      setDialogMsg("Failed to generate PDF. Please try again." + err.message);
      setDialogOpen(true);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Marksheet Generator
        </h1>
        <p className="text-gray-600">Generate marksheets in PDF format</p>
      </div>

      {/* Class & Session Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Class and Session</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={isLoading}
              aria-label="Select class"
            >
              <option value="">Select Class</option>
              {classes.map(clsObj => (
                <option key={clsObj.class} value={clsObj.class}>{clsObj.class}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={isLoading}
              aria-label="Select session"
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>
        <Button
          onClick={fetchStudents}
          disabled={!selectedClass || !session || isLoading}
          aria-label="Fetch students for selected class and session"
        >
          {isLoading ? 'Loading...' : 'Fetch Students'}
        </Button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md" aria-live="polite">
            {error}
          </div>
        )}
      </div>

      {/* Controls & Student Selection */}
      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <Button
              onClick={selectAllStudents}
              aria-label="Select all students"
              variant="outline"
              size="sm"
            >
              Select All
            </Button>
            <Button
              onClick={deselectAllStudents}
              aria-label="Deselect all students"
              variant="outline"
              size="sm"
            >
              Deselect All
            </Button>
            <div className="ml-auto text-sm text-gray-700">
              {selectedStudents.length} of {students.length} students selected
            </div>
          </div>
          {/* Student Selection */}
          <div>
            <h3 className="font-semibold mb-3">Select Students:</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {students.map(student => (
                <label key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedStudents.find(s => s.id === student.id) !== undefined}
                    onChange={() => handleStudentSelection(student)}
                    className="w-4 h-4 text-blue-600"
                    aria-label={`Select ${student.studentName}`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{student.studentName}</div>
                    <div className="text-sm text-gray-500">
                      Roll No: {student.rollNo} | Class: {student.class} | Result: {student.examResult}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marksheet Preview & Download */}
      {selectedStudents.length > 0 && (
        <MarksheetPreview
          students={selectedStudents}
          selectedClass={selectedClass}
          session={session}
          pdfLoading={pdfLoading}
          onGeneratePDF={handlePDFGeneration}
        />
      )}

      {/* Dialog for PDF feedback */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marksheet PDF</DialogTitle>
          </DialogHeader>
          <div className="py-4" aria-live="polite">{dialogMsg}</div>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
