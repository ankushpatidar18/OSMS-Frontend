import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LOGO_BASE64 } from '@/assets/base64';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const SCHOOL_INFO = {
  name: `MATRA KRIPA EDUCATION POINT BADAGAON`,
  location: "BLOCK NALKHEDA, DISTRICT AGAR MALWA, M.P.",
  document_type: "MARKSHEET",
  diseCode: "23510205710",
  schoolCode: "PS59951"
};

export default function MarksheetPreview({ students, selectedClass, session }) {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogType, setDialogType] = useState("info"); // "success" or "error"

  const generatePDF = () => {
    if (!students || students.length === 0) return;

    setLoading(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const logoBase64 = LOGO_BASE64;

      students.forEach((student, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        pdf.setLineWidth(1);
        pdf.rect(5, 5, 200, 287);
        
        pdf.addImage(logoBase64, 'PNG', 5, 10, 35, 30);
        pdf.addImage(logoBase64, 'PNG', 170, 10, 35, 30);
        
        pdf.setTextColor(127, 0, 255);
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
        pdf.setTextColor(0, 0, 0);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(10, 43, 190, 8, 'F');
        pdf.setLineWidth(0.5);
        pdf.rect(10, 43, 190, 8);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`CLASS : ${student.class}`, 15, 48);
        pdf.text(`SESSION : ${session}`, 105, 48, { align: 'center' });
        pdf.text(`DISE CODE : ${SCHOOL_INFO.diseCode}`, 195, 48, { align: 'right' });
        pdf.setLineWidth(0.5);
        pdf.rect(10, 58, 190, 16);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(10, 58, 190, 8, 'F');
        pdf.rect(10, 58, 190, 8);
        pdf.line(25, 58, 25, 74);
        pdf.line(45, 58, 45, 74);
        pdf.line(80, 58, 80, 74);
        pdf.line(115, 58, 115, 74);
        pdf.line(150, 58, 150, 74);
        pdf.line(10, 66, 200, 66);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text('S. NO.', 17.5, 63, { align: 'center' });
        pdf.text('ROLL NO.', 35, 63, { align: 'center' });
        pdf.text('SSSMID', 62.5, 63, { align: 'center' });
        pdf.text('SCHOLAR NO.', 97.5, 63, { align: 'center' });
        pdf.text('SCHOOL CODE', 132.5, 63, { align: 'center' });
        pdf.text('MEDIUM', 175, 63, { align: 'center' });
        pdf.setFont('helvetica', 'bold');
        pdf.text(student.sNo?.toString() || '', 17.5, 70, { align: 'center' });
        pdf.text(student.rollNo?.toString() || '', 35, 70, { align: 'center' });
        pdf.text(student.sssId || '', 62.5, 70, { align: 'center' });
        pdf.text(student.scholarNo || '', 97.5, 70, { align: 'center' });
        pdf.text(SCHOOL_INFO.schoolCode, 132.5, 70, { align: 'center' });
        pdf.text(student.medium || '', 175, 70, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`STUDENT NAME : ${student.studentName}`, 15, 83);
        pdf.text(`FATHER NAME : ${student.fatherName}`, 15, 91);
        pdf.text(`MOTHER NAME : ${student.motherName}`, 15, 99);
        pdf.text(`DATE OF BIRTH : ${student.dateOfBirth}`, 15, 107);
        pdf.setFillColor(240, 240, 240);
        pdf.rect(10, 113, 190, 8, 'F');
        pdf.rect(10, 113, 190, 8);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('EDUCATIONAL PERFORMANCE', 105, 118, { align: 'center' });
        const tableY = 123;
        const isMiddleClass = selectedClass === '6' || selectedClass === '7' || selectedClass === '8';
        const headers = isMiddleClass
          ? [
              'SUBJECT', 'MAXIMUM\nMARKS', 'ANNUAL\nEXAM (60)', 'HALF YEARLY\nEXAM (20)', 
              'PROJECT\n(20)', 'TOTAL', 'GRADE'
            ]
          : [
              'SUBJECT', 'MAXIMUM\nMARKS', 'ANNUAL\nEXAM (60)', 'HALF YEARLY\nEXAM (20)', 
              'MONTHLY\nTEST (10)', 'PROJECT\n(10)', 'TOTAL', 'GRADE'
            ];
        const rows = student.subjects.map(subject => {
          if (isMiddleClass) {
            return [
              subject.name,
              subject.maxMarks?.toString() || '',
              subject.annualExam?.toString() || '',
              subject.halfYearly?.toString() || '',
              subject.project?.toString() || '',
              subject.total?.toString() || '',
              subject.grade || ''
            ];
          } else {
            return [
              subject.name,
              subject.maxMarks?.toString() || '',
              subject.annualExam?.toString() || '',
              subject.halfYearly?.toString() || '',
              subject.monthly?.toString() || '',
              subject.project?.toString() || '',
              subject.total?.toString() || '',
              subject.grade || ''
            ];
          }
        });
        const totalRow = isMiddleClass
          ? [
              'TOTAL',
              student.totalMarks?.toString() || '',
              student.subjects.reduce((sum, subject) => sum + (subject.annualExam || 0), 0).toString(),
              student.subjects.reduce((sum, subject) => sum + (subject.halfYearly || 0), 0).toString(),
              student.subjects.reduce((sum, subject) => sum + (subject.project || 0), 0).toString(),
              student.obtainedMarks?.toString() || '',
              student.totalGrade || ''
            ]
          : [
              'TOTAL',
              student.totalMarks?.toString() || '',
              student.subjects.reduce((sum, subject) => sum + (subject.annualExam || 0), 0).toString(),
              student.subjects.reduce((sum, subject) => sum + (subject.halfYearly || 0), 0).toString(),
              student.subjects.reduce((sum, subject) => sum + (subject.monthly || 0), 0).toString(),
              student.subjects.reduce((sum, subject) => sum + (subject.project || 0), 0).toString(),
              student.obtainedMarks?.toString() || '',
              student.totalGrade || ''
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
            halign: 'center',
            textColor: [0, 0, 0]
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
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.styles.textColor = [0, 0, 0];
            if (data.row.index === rows.length - 1) {
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fillColor = [240, 240, 240];
              data.cell.styles.textColor = [0, 0, 0];
            }
          }
        });
        const resultY = pdf.lastAutoTable.finalY + 5;
        const resultHeaders = [
          'EXAM RESULT', 'PERCENTAGE (%)', 'GRADE', 'TOTAL ATTENDANCE\nDAY', 'TOTAL PRESENT\nDAY'
        ];
        const resultRows = [[
          student.examResult || '',
          student.percentage?.toString() || '',
          student.totalGrade || '',
          student.totalAttendance?.toString() || '',
          student.totalPresent?.toString() || ''
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
            halign: 'center',
            textColor: [0, 0, 0]
          },
          headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center',
            valign: 'middle'
          },
          didParseCell: function(data) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [255, 255, 255];
            data.cell.styles.textColor = [0, 0, 0];
          }
        });
        const gradingY = pdf.lastAutoTable.finalY + 10;
        pdf.setFillColor(240, 240, 240);
        pdf.rect(10, gradingY, 190, 8, 'F');
        pdf.rect(10, gradingY, 190, 8);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('Grading System (Percentage)', 105, gradingY + 5, { align: 'center' });
        pdf.setTextColor(0, 0, 0);
        const gradingHeaders = ['Grade', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
        const gradingRows = [
          ['Obtained\nMarks', 'More than\n85', '76-85', '66-75', '56-65', '51-55', '46-50', '33-45', 'Less than\n33']
        ];
        autoTable(pdf, {
          head: [gradingHeaders],
          body: gradingRows,
          startY: gradingY + 8,
          theme: 'grid',
          styles: {
            fontSize: 7,
            cellPadding: 2,
            lineColor: [0, 0, 0],
            lineWidth: 0.5,
            halign: 'center',
            valign: 'middle',
            textColor: [0, 0, 0]
          },
          headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center',
            valign: 'middle'
          },
          columnStyles: {
            0: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [0, 0, 0] }
          },
          didParseCell: function(data) {
            if (data.column.index === 0) {
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fillColor = [240, 240, 240];
              data.cell.styles.textColor = [0, 0, 0];
            } else {
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fillColor = [255, 255, 255];
              data.cell.styles.textColor = [0, 0, 0];
            }
          }
        });
        const signatureY = 282;
        pdf.setLineWidth(0.3);
        pdf.line(10, signatureY - 4, 40, signatureY - 4);
        pdf.line(93, signatureY - 4, 125, signatureY - 4);
        pdf.line(180, signatureY - 4, 200, signatureY - 4);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('CLASS TEACHER', 25, signatureY, { align: 'center' });
        pdf.text('EXAM INCHARGE', 109, signatureY, { align: 'center' });
        pdf.text('PRINCIPAL', 190, signatureY, { align: 'center' });
      });

      pdf.save(`Marksheets_${selectedClass}_${session}.pdf`);
      setDialogMsg("PDF generated and downloaded successfully!");
      setDialogType("success");
      setDialogOpen(true);
    } catch (error) {
      setDialogMsg("Failed to generate PDF. Please try again." + error.message);
      setDialogType("error");
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Button
        aria-label="Download Marksheet PDF"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
        onClick={generatePDF}
        disabled={!students || students.length === 0 || loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download Marksheet PDF ({students.length} students)
          </>
        )}
      </Button>
      <div className="mt-4 text-gray-600" aria-live="polite">
        <p>
          <b>Preview:</b> Click the button above to download marksheets for all selected students.
        </p>
      </div>
      {/* Feedback Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "success" ? "Success" : "Error"}
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
