import { useState,useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import StudentsFilter from "./students_components/StudentsFilter";
import StudentsTable from "./students_components/StudentsTable";

const ApiUrl = import.meta.env.VITE_BASE_URL;

const classOptions = ["KG1", "KG2", "1", "2", "3", "4", "5", "6", "7", "8"];
const sessionOptions = [
  "2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028",
  "2028-2029", "2029-2030", "2030-2031", "2031-2032", "2032-2033", "2033-2034"
];

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [filters, setFilters] = useState({
    session: "",
    name: "",
    class: "",
    admission_no: "",
  });
  const [isExpanded, setIsExpanded] = useState({});
  const [error, setError] = useState("");

  // Fetch students data
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (!ApiUrl) throw new Error("API URL is not set. Check your environment variables.");
      const queryParams = new URLSearchParams();
      if (filters.session) queryParams.append("session", filters.session);
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.class) queryParams.append("class", filters.class);
      if (filters.admission_no) queryParams.append("admission_no", filters.admission_no);

      const response = await axios.get(
        `${ApiUrl}/students?${queryParams}`,
        { withCredentials: true }
      );
      setStudents(response.data);
    } catch (error) {
      setError("Failed to fetch students. Please try again later.");
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Remove this useEffect (or comment it out):
  // useEffect(() => {
  //   if (filters.session || filters.name || filters.class || filters.admission_no) {
  //     fetchStudents();
  //   }
  // }, [fetchStudents, filters.session, filters.name, filters.class, filters.admission_no]);

  // Handle filter change (debounced for performance)
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({ session: "", name: "", class: "", admission_no: "" });
    setTimeout(() => fetchStudents(), 100);
  };

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  // Start editing
  const startEdit = (student) => {
    setEditingId(student.student_id);
    setEditData({
      name: student.name || "",
      gender: student.gender || "",
      dob: formatDateForInput(student.dob) || "",
      aadhaar_number: student.aadhaar_number || "",
      address: student.address || "",
      pincode: student.pincode || "",
      sssmid: student.sssmid || "",
      class: student.class || "",
      medium: student.medium || "",
      session: student.session || "",
      mobile_number: student.mobile_number || "",
      roll_number: student.roll_number || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      admission_no: student.admission_no || "",
      admission_date: formatDateForInput(student.admission_date) || "",
      height_cm: student.height_cm || "",
      weight_kg: student.weight_kg || "",
      category: student.category || "",
      PEN_Number: student.PEN_Number || "",
      APAAR_Number: student.APAAR_Number || "",
    });
    setIsExpanded((prev) => ({ ...prev, [student.student_id]: true }));
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setIsExpanded({});
  };

  // Handle input change in edit mode
  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes
  const saveChanges = async (studentId) => {
    setLoading(true);
    setError("");
    try {
      if (!ApiUrl) throw new Error("API URL is not set.");
      const response = await axios.put(
        `${ApiUrl}/students/${studentId}`,
        editData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEditingId(null);
        setEditData({});
        fetchStudents();
      } else {
        throw new Error("Failed to update student");
      }
    } catch (error) {
      setError("Error updating student data. Please try again.");
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle expand/collapse
  const toggleExpand = (studentId) => {
    setIsExpanded((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!students.length) {
      setError("No students to export.");
      return;
    }
    const doc = new jsPDF();
    students.forEach((student, index) => {
      if (index > 0) doc.addPage();
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 210, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const schoolName = 'MATRA KRIPA EDUCATION POINT BADAGAON';
      const schoolNameWidth = doc.getTextWidth(schoolName);
      doc.text(schoolName, (210 - schoolNameWidth) / 2, 15);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const address = 'BLOCK NALKHEDA, DISTRICT AGAR MALWA MP';
      const addressWidth = doc.getTextWidth(address);
      doc.text(address, (210 - addressWidth) / 2, 24);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const studentInfo = `Student Information - ${student.name} | Session: ${student.session}`;
      const studentInfoWidth = doc.getTextWidth(studentInfo);
      doc.text(studentInfo, (210 - studentInfoWidth) / 2, 32);
      doc.setTextColor(0, 0, 0);
      let currentY = 45;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(41, 128, 185);
      doc.text('Basic Information', 14, currentY);
      const basicInfo = [
        ['Name', student.name],
        ['Gender', student.gender],
        ['Date of Birth', formatDateForDisplay(student.dob)],
        ['Aadhaar Number', student.aadhaar_number],
        ['Mobile Number', student.mobile_number],
        ['Address', student.address],
        ['Pincode', student.pincode]
      ];
      autoTable(doc, {
        startY: currentY + 2,
        head: [],
        body: basicInfo,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [44, 62, 80] },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold', fillColor: [236, 240, 241], textColor: [52, 73, 94] },
          1: { cellWidth: 90, fillColor: [255, 255, 255] }
        }
      });
      currentY = doc.lastAutoTable.finalY + 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(231, 76, 60);
      doc.text('Academic Information', 14, currentY);
      const academicInfo = [
        ['Class', student.class],
        ['Roll Number', student.roll_number],
        ['Medium', student.medium],
        ['SSSMID', student.sssmid],
        ['Category', student.category],
        ['PEN Number', student.PEN_Number],
        ['APAAR Number', student.APAAR_Number]
      ];
      autoTable(doc, {
        startY: currentY + 2,
        head: [],
        body: academicInfo,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [44, 62, 80] },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold', fillColor: [255, 235, 235], textColor: [192, 57, 43] },
          1: { cellWidth: 90, fillColor: [255, 255, 255] }
        }
      });
      currentY = doc.lastAutoTable.finalY + 8;
      const leftColX = 14;
      const rightColX = 110;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(39, 174, 96);
      doc.text('Parents Information', leftColX, currentY);
      const parentsInfo = [
        ['Father\'s Name', student.father_name],
        ['Mother\'s Name', student.mother_name]
      ];
      autoTable(doc, {
        startY: currentY + 2,
        head: [],
        body: parentsInfo,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [44, 62, 80] },
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold', fillColor: [230, 247, 236], textColor: [39, 174, 96] },
          1: { cellWidth: 55, fillColor: [255, 255, 255] }
        },
        margin: { left: leftColX }
      });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(142, 68, 173);
      doc.text('Admission Information', rightColX, currentY);
      const admissionInfo = [
        ['Admission No', student.admission_no],
        ['Admission Date', formatDateForDisplay(student.admission_date)]
      ];
      autoTable(doc, {
        startY: currentY + 2,
        head: [],
        body: admissionInfo,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [44, 62, 80] },
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold', fillColor: [243, 235, 247], textColor: [142, 68, 173] },
          1: { cellWidth: 55, fillColor: [255, 255, 255] }
        },
        margin: { left: rightColX }
      });
      currentY = Math.max(doc.lastAutoTable.finalY, currentY + 25) + 8;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(230, 126, 34);
      doc.text('Physical Information', leftColX, currentY);
      const physicalInfo = [
        ['Height (cm)', student.height_cm],
        ['Weight (kg)', student.weight_kg]
      ];
      autoTable(doc, {
        startY: currentY + 2,
        head: [],
        body: physicalInfo,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2, textColor: [44, 62, 80] },
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold', fillColor: [254, 245, 231], textColor: [230, 126, 34] },
          1: { cellWidth: 55, fillColor: [255, 255, 255] }
        }
      });
      const pageHeight = doc.internal.pageSize.height;
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(2);
      doc.line(14, pageHeight - 20, 196, pageHeight - 20);
      doc.setFontSize(8);
      doc.setTextColor(127, 140, 141);
      doc.setFont('helvetica', 'italic');
      const footerText = 'Generated by Matra Kripa Education Point - Student Management System';
      const footerWidth = doc.getTextWidth(footerText);
      doc.text(footerText, (210 - footerWidth) / 2, pageHeight - 10);
    });
    const timestamp = new Date().toISOString().split('T')[0];
    doc.save(`students_${filters.session || 'all'}_${timestamp}.pdf`);
  };

  // Add a handleSearch function:
  const handleSearch = () => {
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Students Management</h1>
          <p className="text-gray-600">Manage and edit student information</p>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <StudentsFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch} // Pass this prop
          sessionOptions={sessionOptions}
          classOptions={classOptions}
          clearFilters={clearFilters}
          exportToPDF={exportToPDF}
          students={students}
        />
        <StudentsTable
          students={students}
          loading={loading}
          editingId={editingId}
          editData={editData}
          isExpanded={isExpanded}
          classOptions={classOptions}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          handleEditChange={handleEditChange}
          saveChanges={saveChanges}
          toggleExpand={toggleExpand}
          formatDateForDisplay={formatDateForDisplay}
        />
      </div>
    </div>
  );
};

export default Students;
