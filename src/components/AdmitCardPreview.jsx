import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LOGO_BASE64 } from '@/assets/base64';

// School and exam info constants
const SCHOOL_INFO = {
  name: `MATRA KRIPA EDUCATION POINT`,
  location: "BADAGAON",
  details: "ADMIT CARD AND EXAMINATION SCHEDULE",
};

const INSTRUCTIONS = [
  "THERE IS NO VALIDITY OF THIS ADMIT CARD WITHOUT PAY OF SCHOOL FEE.",
  "ANSWER SHOULD BE WRITTEN ONLY IN BLUE/BLACK INK.",
  "NO WRITTEN MATERIAL SHOULD BE CARRIED IN THE EXAMINATION HALL.",
  "ANSWER SHOULD WRITTEN IN BOTH SIDES.",
  "PLEASE DO NOT CARRY GADGETS (MOBILE, PAGERS, CALCULATORS ETC.",
  "NO ONE IS ALLOWED TO SIT IN THE EXAMINATION HALL WITHOUT ADMIT CARD.",
];

const SCHOOL_LOGO = LOGO_BASE64;

// Utility: Format ISO date to DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function AdmitCardPreview({ data }) {
  if (!data) return null;
  const { students, exam, schedule } = data;

  // Generate PDF for all students
  const generatePDF = () => {
    const doc = new jsPDF();

    students.forEach((student, idx) => {
      if (idx > 0) doc.addPage();

      // Logo
      doc.addImage(SCHOOL_LOGO, 'PNG', 18, 11, 48, 40);

      // School name and location
      doc.setFontSize(20);
      doc.setFont('serif', 'bold');
      doc.setTextColor(128, 0, 128); // Purple
      doc.text(SCHOOL_INFO.name, 60, 20);
      doc.text(SCHOOL_INFO.location, 110, 28, { align: 'center' });

      // Admit card title and exam/session
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(SCHOOL_INFO.details, 113, 40, { align: 'center' });
      doc.text(`${exam.name} Examination ${exam.session}`, 109, 47, { align: 'center' });

      // Student info
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(`NAME: ${student.name}`, 17, 60);
      doc.text(`FATHER'S NAME: ${student.father_name}`, 17, 70);

      // Class and Roll No
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`Class: ${student.class}`, 31, 80, { align: 'right' });
      doc.text(`Roll No: ${student.roll_number}`, 195, 80, { align: 'right' });

      // Exam Schedule Table
      autoTable(doc, {
        startY: 90,
        head: [['Date', 'Day', 'Subject', 'Time']],
        body: schedule.map(row => [
          formatDate(row.exam_date),
          row.exam_day,
          row.subject_name,
          row.exam_time
        ]),
        styles: {
          fontSize: 10,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          lineWidth: 0.1
        },
        headStyles: {
          fillColor: [0, 0, 255],
          textColor: [255, 255, 255],
          lineColor: [0, 0, 0],
          lineWidth: 0.1
        },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1
      });

      // Instructions Section
      const tableY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 100;
      doc.setLineWidth(0.2);
      doc.line(10, tableY + 5, 200, tableY + 5);

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Instructions:', 15, tableY + 15);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      INSTRUCTIONS.forEach((instr, i) => {
        doc.text(`${i + 1}. ${instr}`, 20, tableY + 21 + i * 6);
      });

      // Principal signature (right side)
      const instructionsEndY = tableY + 21 + (INSTRUCTIONS.length * 6);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('Principal', 170, instructionsEndY + 25, { align: 'center' });

      // Borders and lines for neatness
      doc.setLineWidth(0.2);
      doc.rect(10, 5, 190, instructionsEndY + 25);
      doc.line(10, 52, 200, 52);
      doc.line(10, 85, 200, 85);
    });

    doc.save('admit_cards.pdf');
  };

  return (
    <div className="mt-6">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={generatePDF}
      >
        Download Admit Cards PDF ({students.length} students)
      </button>
      <div className="mt-4 text-gray-600">
        <p>
          <b>Preview:</b> Click the button above to download admit cards for all students in the selected class.
        </p>
      </div>
    </div>
  );
}
