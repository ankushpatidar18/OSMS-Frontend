import React, { useState, useEffect } from 'react';
import { Download, FileText, Eye } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LOGO_BASE64 } from '@/assets/base64';


 // School and marksheet info constants
const SCHOOL_INFO = {
  name: `MATRA KRIPA EDUCATION POINT BADAGAON`,
  location: "BLOCK NALKHEDA, DISTRICT AGAR MALWA, M.P.",
  document_type: "MARKSHEET",
  diseCode: "23510205710",
  schoolCode: "PS59951"
};

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
          <span>SESSION : 2024-2025</span>
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
          <div className="border-r border-black p-2 text-xs text-center">{SCHOOL_INFO.schoolCode}</div>
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
            <div className="border-r border-black p-2 text-xs text-center font-bold">
              {student.subjects.reduce((sum, subject) => sum + (subject.annualExam || 0), 0)}
            </div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">
              {student.subjects.reduce((sum, subject) => sum + (subject.halfYearly || 0), 0)}
            </div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">
              {student.subjects.reduce((sum, subject) => sum + (subject.monthly || 0), 0)}
            </div>
            <div className="border-r border-black p-2 text-xs text-center font-bold">
              {student.subjects.reduce((sum, subject) => sum + (subject.project || 0), 0)}
            </div>
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
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [session, setSession] = useState('2024-2025');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewStudent, setPreviewStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available classes on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/classes', { withCredentials: true })
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
        `http://localhost:5000/api/marksheets/marksheet/${selectedClass}/${session}`,
        { withCredentials: true }
      );
      
      setStudents(response.data);
      setSelectedStudents(response.data); // Select all by default
      
      if (response.data.length > 0) {
        setPreviewStudent(response.data[0]);
      } else {
        setError('No students found for the selected class and session');
      }
      
    } catch (err) {
      setError('Failed to fetch student data: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  // Generate PDF for selected students
  const generatePDF = () => {
    if (selectedStudents.length === 0) return;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add your logo base64 string here
    const logoBase64 = LOGO_BASE64;
    
    selectedStudents.forEach((student, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      
      // Add border around the entire document
      pdf.setLineWidth(1);
      pdf.rect(5, 5, 200, 287);
      
      // Add logos (left and right)
      try {
        // Left logo
        pdf.addImage(logoBase64, 'PNG', 15, 10, 28, 25);
        // Right logo
        pdf.addImage(logoBase64, 'PNG', 175, 10, 28, 25);
      } catch (error) {
        console.log('Logo not loaded, skipping...' + error.message);
      }
      
      // Add school header with purple color
      pdf.setTextColor(127, 0, 255); // Purple color
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(SCHOOL_INFO.name, 107, 18, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(SCHOOL_INFO.location, 105, 26, { align: 'center' });
      
      pdf.setTextColor(127, 0, 255);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(SCHOOL_INFO.document_type, 105, 34, { align: 'center' });
      
      // Reset text color to black
      pdf.setTextColor(0, 0, 0);
      
      // Class, Session, DISE code row with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, 38, 190, 8, 'F');
      pdf.setLineWidth(0.5);
      pdf.rect(10, 38, 190, 8);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`CLASS : ${student.class}`, 15, 43);
      pdf.text(`SESSION : 2024-25`, 105, 43, { align: 'center' });
      pdf.text(`DISE CODE : ${SCHOOL_INFO.diseCode}`, 195, 43, { align: 'right' });
      
      // Student details table with borders
      pdf.setLineWidth(0.5);
      pdf.rect(10, 50, 190, 16);
      
      // Header row with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, 50, 190, 8, 'F');
      pdf.rect(10, 50, 190, 8);
      
      // Vertical lines for the header
      pdf.line(25, 50, 25, 66); // After S.NO
      pdf.line(45, 50, 45, 66); // After ROLL NO
      pdf.line(80, 50, 80, 66); // After SSSID
      pdf.line(115, 50, 115, 66); // After SCHOLAR NO
      pdf.line(150, 50, 150, 66); // After SCHOOL CODE
      pdf.line(10, 58, 200, 58); // Horizontal line between header and data
      
      // Header row
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('S. NO.', 17.5, 55, { align: 'center' });
      pdf.text('ROLL NO.', 35, 55, { align: 'center' });
      pdf.text('SSSMID', 62.5, 55, { align: 'center' });
      pdf.text('SCHOLAR NO.', 97.5, 55, { align: 'center' });
      pdf.text('SCHOOL CODE', 132.5, 55, { align: 'center' });
      pdf.text('MEDIUM', 175, 55, { align: 'center' });
      
      // Data row
      pdf.setFont('helvetica', 'normal');
      pdf.text(student.sNo.toString(), 17.5, 62, { align: 'center' });
      pdf.text(student.rollNo.toString(), 35, 62, { align: 'center' });
      pdf.text(student.sssId, 62.5, 62, { align: 'center' });
      pdf.text(student.scholarNo, 97.5, 62, { align: 'center' });
      pdf.text(SCHOOL_INFO.schoolCode, 132.5, 62, { align: 'center' });
      pdf.text(student.medium, 175, 62, { align: 'center' });
      
      // Personal details with proper spacing
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`STUDENT'S NAME : ${student.studentName}`, 15, 75);
      pdf.text(`FATHER'S NAME : ${student.fatherName}`, 15, 83);
      pdf.text(`MOTHER'S NAME : ${student.motherName}`, 15, 91);
      pdf.text(`DATE OF BIRTH : ${student.dateOfBirth}`, 15, 99);
      
      // Educational performance header with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, 105, 190, 8, 'F');
      pdf.rect(10, 105, 190, 8);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCATIONAL PERFORMANCE', 105, 110, { align: 'center' });
      
      // Subject table
      const tableY = 115;
      let headers;
      if(selectedClass=='6' || selectedClass=='7' || selectedClass=='8'){
        headers = [
        'SUBJECT', 'MAXIMUM\nMARKS', 'ANNUAL\nEXAM (60)', 'HALF YEARLY\nEXAM (20)', 
        'PROJECT\n(20)', 'TOTAL', 'GRADE'
      ];
}else{
        headers = [
        'SUBJECT', 'MAXIMUM\nMARKS', 'ANNUAL\nEXAM (60)', 'HALF YEARLY\nEXAM (20)', 
        'MONTHLY\nTEST (10)', 'PROJECT\n(10)', 'TOTAL', 'GRADE'
      ];

}
      
      
      const rows = student.subjects.map(subject => [
        subject.name,
        subject.maxMarks.toString(),
        subject.annualExam.toString(),
        subject.halfYearly.toString(),
        subject.monthly.toString(),
        subject.project.toString(),
        subject.total.toString(),
        subject.grade
      ]);
      
      // Add total row
      const totalRow = [
        'TOTAL',
        student.totalMarks.toString(),
        student.subjects.reduce((sum, subject) => sum + (subject.annualExam || 0), 0).toString(),
        student.subjects.reduce((sum, subject) => sum + (subject.halfYearly || 0), 0).toString(),
        student.subjects.reduce((sum, subject) => sum + (subject.monthly || 0), 0).toString(),
        student.subjects.reduce((sum, subject) => sum + (subject.project || 0), 0).toString(),
        student.obtainedMarks.toString(),
        student.totalGrade
      ];
      
      rows.push(totalRow);
      
      autoTable(pdf, {
        head: [headers],
        body: rows,
        startY: tableY,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
          halign: 'center'
        },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle'
        },
        columnStyles: {
          0: { halign: 'left' }
        },
        didParseCell: function(data) {
          // Make the total row bold
          if (data.row.index === rows.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [240, 240, 240];
          }
        }
      });
      
      // Result table
      const resultY = pdf.lastAutoTable.finalY + 5;
      const resultHeaders = [
        'EXAM RESULT', 'PERCENTAGE (%)', 'GRADE', 'TOTAL ATTENDANCE\nDAY', 'TOTAL PRESENT\nDAY'
      ];
      
      const resultRows = [[
        student.examResult,
        student.percentage.toString(),
        student.totalGrade,
        student.totalAttendance.toString(),
        student.totalPresent.toString()
      ]];
      
      autoTable(pdf, {
        head: [resultHeaders],
        body: resultRows,
        startY: resultY,
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
          halign: 'center'
        },
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle'
        }
      });
      
      // Signature section with proper spacing
      const signatureY = pdf.lastAutoTable.finalY + 50;
      
      // Signature lines
      pdf.setLineWidth(0.5);
      pdf.line(25, signatureY, 65, signatureY);
      pdf.line(85, signatureY, 125, signatureY);
      pdf.line(145, signatureY, 185, signatureY);
      
      // Signature labels
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('CLASS TEACHER', 45, signatureY + 5, { align: 'center' });
      pdf.text('EXAM INCHARGE', 105, signatureY + 5, { align: 'center' });
      pdf.text('PRINCIPAL', 165, signatureY + 5, { align: 'center' });
    });
    
    pdf.save(`Marksheets_${selectedClass}_${session}.pdf`);
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Marksheet Generator & Preview
        </h1>
        <p className="text-gray-600">Preview and generate marksheets in PDF format</p>
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
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={fetchStudents}
          disabled={!selectedClass || !session || isLoading}
          className={`px-4 py-2 rounded-md text-white ${
            !selectedClass || !session || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Loading...' : 'Fetch Students'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Controls & Student Selection */}
      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            
            <button
              onClick={generatePDF}
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
            
            <div className="flex gap-2 ml-auto">
              <button
                onClick={selectAllStudents}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Select All
              </button>
              <button
                onClick={deselectAllStudents}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Deselect All
              </button>
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
      )}

      {/* Marksheet Preview */}
      {showPreview && previewStudent && (
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
    </div>
  );
}
