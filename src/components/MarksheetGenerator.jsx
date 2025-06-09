import React, { useState } from 'react';
import { Download, FileText, Eye } from 'lucide-react';

// School and marksheet info constants
const SCHOOL_INFO = {
  name: `MATRA KRIPA EDUCATION POINT BADAGAON`,
  location: "BLOCK NALKHEDA, DISTRICT AGAR MALWA, M.P.",
  document_type: "MARKSHEET",
  session: "2024-25",
   diseCode: "2351020S710"
};

// Dummy student data
const DUMMY_STUDENTS = [
  {
    id: 1,
    sNo: 5,
    rollNo: 405,
    sssId: "304350519",
    scholarNo: "248",
    schoolCode: "PS99951",
    medium: "ENGLISH",
    studentName: "BALRAM YADAV",
    fatherName: "DINESH YADAV",
    motherName: "SANGITA YADAV",
    dateOfBirth: "04/06/2016",
    class: "4 TH",
   
    subjects: [
      { name: "ENGLISH", maxMarks: 100, annualExam: 41, halfYearly: 11, monthly: 10, project: 9, total: 71, grade: "B" },
      { name: "HINDI", maxMarks: 100, annualExam: 36, halfYearly: 15, monthly: 9, project: 9, total: 69, grade: "B" },
      { name: "MATHEMATICS", maxMarks: 100, annualExam: 45, halfYearly: 10, monthly: 9, project: 8, total: 72, grade: "B" },
      { name: "EVS", maxMarks: 100, annualExam: 30, halfYearly: 10, monthly: 8, project: 9, total: 57, grade: "B" }
    ],
    totalMarks: 400,
    obtainedMarks: 269,
    totalGrade: "B",
    examResult: "PASS",
    percentage: 67.25,
    totalAttendance: 180,
    totalPresent: 172
  },
  {
    id: 2,
    sNo: 6,
    rollNo: 406,
    sssId: "304350520",
    scholarNo: "249",
    schoolCode: "PS99951",
    medium: "ENGLISH",
    studentName: "PRIYA SHARMA",
    fatherName: "RAJESH SHARMA",
    motherName: "MEERA SHARMA",
    dateOfBirth: "15/08/2016",
    class: "4 TH",
    subjects: [
      { name: "ENGLISH", maxMarks: 100, annualExam: 45, halfYearly: 13, monthly: 12, project: 10, total: 80, grade: "A" },
      { name: "HINDI", maxMarks: 100, annualExam: 42, halfYearly: 16, monthly: 11, project: 10, total: 79, grade: "A" },
      { name: "MATHEMATICS", maxMarks: 100, annualExam: 48, halfYearly: 12, monthly: 10, project: 9, total: 79, grade: "A" },
      { name: "EVS", maxMarks: 100, annualExam: 35, halfYearly: 12, monthly: 10, project: 10, total: 67, grade: "B" }
    ],
    totalMarks: 400,
    obtainedMarks: 305,
    totalGrade: "A",
    examResult: "PASS",
    percentage: 76.25,
    totalAttendance: 180,
    totalPresent: 178
  }
];

// Marksheet Preview Component
const MarksheetPreview = ({ student }) => {
  return (
    <div className="bg-white border-4 border-black p-6 mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header Section */}
      <div className="text-center mb-4">
        {/* Logo placeholders */}
        <div className="flex justify-between items-start mb-2">
          <div className="w-16 h-16 bg-purple-100 border-2 border-purple-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-purple-600">LOGO</span>
          </div>
          <div className="flex-1 mx-4">
            <h1 className="text-lg font-bold text-purple-700 mb-1">{SCHOOL_INFO.name}</h1>
            <p className="text-sm">{SCHOOL_INFO.location}</p>
            <h2 className="text-lg font-bold mt-2">{SCHOOL_INFO.document_type}</h2>
          </div>
          <div className="w-16 h-16 bg-purple-100 border-2 border-purple-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-purple-600">LOGO</span>
          </div>
        </div>
      </div>

      {/* Class, Session, Disc Code Row */}
      <div className="border-t border-b border-black py-2 mb-4">
        <div className="flex justify-between text-sm font-bold">
          <span>CLASS : {student.class}</span>
          <span>SESSION : {SCHOOL_INFO.session}</span>
          <span>DISE CODE : {SCHOOL_INFO.diseCode}</span>
        </div>
      </div>

      {/* Student Details Table */}
      <div className="border border-black mb-4">
        {/* Header Row */}
        <div className="grid grid-cols-6 border-b border-black bg-gray-50">
          <div className="border-r border-black p-2 text-xs font-bold text-center">S. NO.</div>
          <div className="border-r border-black p-2 text-xs font-bold text-center">ROLL NO.</div>
          <div className="border-r border-black p-2 text-xs font-bold text-center">SSSID</div>
          <div className="border-r border-black p-2 text-xs font-bold text-center">SCHOLAR NO.</div>
          <div className="border-r border-black p-2 text-xs font-bold text-center">SCHOOL CODE</div>
          <div className="p-2 text-xs font-bold text-center">MEDIUM</div>
        </div>
        {/* Data Row */}
        <div className="grid grid-cols-6">
          <div className="border-r border-black p-2 text-xs text-center">{student.sNo}</div>
          <div className="border-r border-black p-2 text-xs text-center">{student.rollNo}</div>
          <div className="border-r border-black p-2 text-xs text-center">{student.sssId}</div>
          <div className="border-r border-black p-2 text-xs text-center">{student.scholarNo}</div>
          <div className="border-r border-black p-2 text-xs text-center">{student.schoolCode}</div>
          <div className="p-2 text-xs text-center">{student.medium}</div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-bold">STUDENT'S NAME : {student.studentName}</p>
        <p className="text-sm font-bold">FATHER'S NAME : {student.fatherName}</p>
        <p className="text-sm font-bold">MOTHER'S NAME : {student.motherName}</p>
        <p className="text-sm font-bold">DATE OF BIRTH : {student.dateOfBirth}</p>
      </div>

      {/* Educational Performance Table */}
      <div className="mb-4">
        <h3 className="text-center text-sm font-bold mb-2 border border-black bg-gray-50 p-2">EDUCATIONAL PERFORMANCE</h3>
        
        <div className="border border-black">
          {/* Table Header */}
          <div className="grid grid-cols-8 border-b border-black bg-gray-50">
            <div className="border-r border-black p-2 text-xs font-bold text-center">SUBJECT</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">MAXIMUM<br/>MARKS</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">ANNUAL<br/>EXAM (60)</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">HALF YEARLY<br/>EXAM (20)</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">MONTHLY<br/>TEST (10)</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">PROJECT<br/>(10)</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">TOTAL</div>
            <div className="p-2 text-xs font-bold text-center">GRADE</div>
          </div>

          {/* Subject Rows */}
          {student.subjects.map((subject, index) => (
            <div key={index} className="grid grid-cols-8 border-b border-black">
              <div className="border-r border-black p-2 text-xs">{subject.name}</div>
              <div className="border-r border-black p-2 text-xs text-center">{subject.maxMarks}</div>
              <div className="border-r border-black p-2 text-xs text-center">{subject.annualExam}</div>
              <div className="border-r border-black p-2 text-xs text-center">{subject.halfYearly}</div>
              <div className="border-r border-black p-2 text-xs text-center">{subject.monthly}</div>
              <div className="border-r border-black p-2 text-xs text-center">{subject.project}</div>
              <div className="border-r border-black p-2 text-xs text-center font-bold">{subject.total}</div>
              <div className="p-2 text-xs text-center font-bold">{subject.grade}</div>
            </div>
          ))}

          {/* Total Row */}
          <div className="grid grid-cols-8 bg-gray-50">
            <div className="border-r border-black p-2 text-xs font-bold">TOTAL</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">{student.totalMarks}</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">152</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">46</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">36</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">35</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">{student.obtainedMarks}</div>
            <div className="p-2 text-xs text-center font-bold">{student.totalGrade}</div>
          </div>
        </div>
      </div>

      {/* Result Table */}
      <div className="mb-8">
        <div className="border border-black">
          {/* Result Header */}
          <div className="grid grid-cols-5 border-b border-black bg-gray-50">
            <div className="border-r border-black p-2 text-xs font-bold text-center">EXAM RESULT</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">PERCENTAGE (%)</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">GRADE</div>
            <div className="border-r border-black p-2 text-xs font-bold text-center">TOTAL ATTENDANCE<br/>DAY</div>
            <div className="p-2 text-xs font-bold text-center">TOTAL PRESENT<br/>DAY</div>
          </div>
          
          {/* Result Data */}
          <div className="grid grid-cols-5">
            <div className="border-r border-black p-2 text-xs text-center font-bold">{student.examResult}</div>
            <div className="border-r border-black p-2 text-xs text-center">{student.percentage}</div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">{student.totalGrade}</div>
            <div className="border-r border-black p-2 text-xs text-center">{student.totalAttendance}</div>
            <div className="p-2 text-xs text-center">{student.totalPresent}</div>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-16 flex justify-between">
        <div className="text-center">
          <div className="w-32 border-b border-black mb-2"></div>
          <p className="text-xs font-bold">CLASS TEACHER</p>
        </div>
        <div className="text-center">
          <div className="w-32 border-b border-black mb-2"></div>
          <p className="text-xs font-bold">EXAM INCHARGE</p>
        </div>
        <div className="text-center">
          <div className="w-32 border-b border-black mb-2"></div>
          <p className="text-xs font-bold">PRINCIPAL</p>
        </div>
      </div>
    </div>
  );
};

export default function MarksheetGenerator() {
  const [selectedStudents, setSelectedStudents] = useState([DUMMY_STUDENTS[0]]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewStudent, setPreviewStudent] = useState(DUMMY_STUDENTS[0]);

  // Generate actual PDF (you need to install jspdf and jspdf-autotable)
  const generateActualPDF = () => {
    alert(`To generate actual PDF, you need to:

1. Install packages:
   npm install jspdf jspdf-autotable

2. Replace this function with the actual jsPDF code I provided.

3. The preview above shows exactly how your marksheet will look!`);
  };

  const handleStudentSelection = (student) => {
    const isSelected = selectedStudents.find(s => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Marksheet Generator & Preview
        </h1>
        <p className="text-gray-600">Preview and generate marksheets in PDF format</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          
          <button
            onClick={generateActualPDF}
            disabled={selectedStudents.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white ${
              selectedStudents.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Download className="w-4 h-4" />
            Generate PDF ({selectedStudents.length} students)
          </button>
        </div>

        {/* Student Selection */}
        <div>
          <h3 className="font-semibold mb-3">Select Students:</h3>
          <div className="space-y-2">
            {DUMMY_STUDENTS.map(student => (
              <label key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedStudents.find(s => s.id === student.id) !== undefined}
                  onChange={() => handleStudentSelection(student)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-medium">{student.studentName}</div>
                  <div className="text-sm text-gray-500">
                    Roll No: {student.rollNo} | Class: {student.class} | Result: {student.examResult}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPreviewStudent(student);
                    setShowPreview(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Preview
                </button>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Marksheet Preview */}
      {showPreview && (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Marksheet Preview - {previewStudent.studentName}
            </h3>
            <div className="overflow-auto">
              <MarksheetPreview student={previewStudent} />
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">How to get PDF download working:</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>1. Install required packages in your project:</p>
          <code className="bg-yellow-100 p-1 rounded">npm install jspdf jspdf-autotable</code>
          
          <p>2. The preview above shows exactly how your marksheet will look when printed to PDF</p>
          
          <p>3. Replace the generateActualPDF function with the actual jsPDF code (I can provide this separately)</p>
          
          <p>4. Add your school logo in base64 format like in your admit card code</p>
        </div>
      </div>
    </div>
  );
}