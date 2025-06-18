import { useState, useEffect } from "react"
import { Search, Edit2, Save, X, Filter, RotateCcw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [filters, setFilters] = useState({
    session: "",
    name: "",
    class: "",
    roll_number: "",
  })
  const [isExpanded, setIsExpanded] = useState({}) 

  const classOptions = ["KG1", "KG2", "1", "2", "3", "4", "5", "6", "7", "8"]
  const sessionOptions = [
    "2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028",
    "2028-2029", "2029-2030", "2030-2031", "2031-2032", "2032-2033", "2033-2034"
  ];

  // Fetch students data
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.session) queryParams.append("session", filters.session);
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.class) queryParams.append("class", filters.class);
      if (filters.roll_number) queryParams.append("roll_number", filters.roll_number);

      const response = await axios.get(
        `http://localhost:5000/api/students?${queryParams}`,
        { withCredentials: true }
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      // alert("Error fetching students data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  // Handle search
  const handleSearch = () => {
    fetchStudents()
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({ session: "", name: "", class: "", roll_number: "" })
    setTimeout(() => fetchStudents(), 100)
  }

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Start editing
  const startEdit = (student) => {
    setEditingId(student.student_id)
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
      is_repeater: student.is_repeater || 0,
      mobile_number: student.mobile_number || "",
      roll_number: student.roll_number || "",
      father_name: student.father_name || "",
      mother_name: student.mother_name || "",
      admission_no: student.admission_no || "",
      admission_date: formatDateForInput(student.admission_date) || "",
      height_cm: student.height_cm || "",
      weight_kg: student.weight_kg || "",
      category: student.category || "",
      PEN_Number: student.PEN_Number || "",      // Added
      APAAR_Number: student.APAAR_Number || "",  // Added
    })
    setIsExpanded((prev) => ({ ...prev, [student.student_id]: true }))
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
    setIsExpanded({}) // Reset isExpanded state
  }

  // Handle input change in edit mode
  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  // Save changes
  const saveChanges = async (studentId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        editData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Student updated successfully!");
        setEditingId(null);
        setEditData({});
        fetchStudents(); // Refresh the data
      } else {
        throw new Error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student data");
    }
  }

  // Toggle expand/collapse
  const toggleExpand = (studentId) => {
    setIsExpanded((prev) => ({ ...prev, [studentId]: !prev[studentId] }))
  }

 // Export to PDF with enhanced styling
// Export to PDF with enhanced styling
const exportToPDF = () => {
  const doc = new jsPDF();
  
  students.forEach((student, index) => {
    // Add page for each student except first
    if (index > 0) {
      doc.addPage();
    }
    
    // Header Section with Background
    doc.setFillColor(41, 128, 185); // Blue background
    doc.rect(0, 0, 210, 35, 'F'); // Reduced header height
    
    // School Name - Main Header
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const schoolName = 'MATRA KRIPA EDUCATION POINT BADAGAON';
    const schoolNameWidth = doc.getTextWidth(schoolName);
    doc.text(schoolName, (210 - schoolNameWidth) / 2, 15); // Centered
    
    // School Address
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const address = 'BLOCK NALKHEDA, DISTRICT AGAR MALWA MP';
    const addressWidth = doc.getTextWidth(address);
    doc.text(address, (210 - addressWidth) / 2, 24); // Centered
    
    // Student Name and Session
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const studentInfo = `Student Information - ${student.name} | Session: ${student.session}`;
    const studentInfoWidth = doc.getTextWidth(studentInfo);
    doc.text(studentInfo, (210 - studentInfoWidth) / 2, 32);
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    
    let currentY = 45;
    
    // Basic Information Section
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
      styles: { 
        fontSize: 8,
        cellPadding: 2,
        textColor: [44, 62, 80]
      },
      columnStyles: { 
        0: { 
          cellWidth: 40,
          fontStyle: 'bold',
          fillColor: [236, 240, 241],
          textColor: [52, 73, 94]
        },
        1: { 
          cellWidth: 90,
          fillColor: [255, 255, 255]
        }
      }
    });
    
    currentY = doc.lastAutoTable.finalY + 8;
    
    // Academic Information Section
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
      styles: { 
        fontSize: 8,
        cellPadding: 2,
        textColor: [44, 62, 80]
      },
      columnStyles: {
        0: { 
          cellWidth: 40,
          fontStyle: 'bold',
          fillColor: [255, 235, 235],
          textColor: [192, 57, 43]
        },
        1: { 
          cellWidth: 90,
          fillColor: [255, 255, 255]
        }
      }
    });
    
    currentY = doc.lastAutoTable.finalY + 8;
    
    // Create two-column layout for remaining sections
    const leftColX = 14;
    const rightColX = 110;
    
    
    // Parents Information Section (Left Column)
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
      styles: { 
        fontSize: 8,
        cellPadding: 2,
        textColor: [44, 62, 80]
      },
      columnStyles: {
        0: { 
          cellWidth: 30,
          fontStyle: 'bold',
          fillColor: [230, 247, 236],
          textColor: [39, 174, 96]
        },
        1: { 
          cellWidth: 55,
          fillColor: [255, 255, 255]
        }
      },
      margin: { left: leftColX }
    });
    
    // Admission Information Section (Right Column)
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
      styles: { 
        fontSize: 8,
        cellPadding: 2,
        textColor: [44, 62, 80]
      },
      columnStyles: {
        0: { 
          cellWidth: 30,
          fontStyle: 'bold',
          fillColor: [243, 235, 247],
          textColor: [142, 68, 173]
        },
        1: { 
          cellWidth: 55,
          fillColor: [255, 255, 255]
        }
      },
      margin: { left: rightColX }
    });
    
    currentY = Math.max(doc.lastAutoTable.finalY, currentY + 25) + 8;
    
    // Physical Information Section (Center)
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
      styles: { 
        fontSize: 8,
        cellPadding: 2,
        textColor: [44, 62, 80]
      },
      columnStyles: {
        0: { 
          cellWidth: 30,
          fontStyle: 'bold',
          fillColor: [254, 245, 231],
          textColor: [230, 126, 34]
        },
        1: { 
          cellWidth: 55,
          fillColor: [255, 255, 255]
        }
      }
    });
    
    // Footer with border
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
  
  // Save the PDF with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  doc.save(`students_${filters.session || 'all'}_${timestamp}.pdf`);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Students Management</h1>
          <p className="text-gray-600">Manage and edit student information</p>
        </div>

   {/* Filters Section */}
<Card className="shadow-lg border-0">
  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
    <CardTitle className="flex items-center gap-2 text-lg">
      <Filter className="h-5 w-5" />
      Search & Filter Students
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    {/* Filter Fields Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Session Filter (Mandatory) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Session <span className="text-red-500">*</span>
        </label>
        <select
          value={filters.session}
          onChange={(e) => handleFilterChange("session", e.target.value)}
          className="px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          required
        >
          <option value="">Select Session</option>
          {sessionOptions.map((session) => (
            <option key={session} value={session}>{session}</option>
          ))}
        </select>
      </div>
      {/* Name Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Student Name</label>
        <input
          type="text"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          placeholder="Search by name..."
          className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          disabled={!filters.session}
        />
      </div>
      {/* Class Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Class</label>
        <select
          value={filters.class}
          onChange={(e) => handleFilterChange("class", e.target.value)}
          className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          disabled={!filters.session}
        >
          <option value="">All Classes</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>
      {/* Roll Number Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">Roll Number</label>
        <input
          type="text"
          value={filters.roll_number}
          onChange={(e) => handleFilterChange("roll_number", e.target.value)}
          placeholder="Search by roll number..."
          className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          disabled={!filters.session}
        />
      </div>
    </div>
    {/* Buttons Row */}
    <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
      <Button
        onClick={handleSearch}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
        disabled={!filters.session}
      >
        <Search className="h-4 w-4" />
        Search
      </Button>
      <Button
        onClick={clearFilters}
        variant="outline"
        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <RotateCcw className="h-4 w-4" />
        Clear
      </Button>
      {/* Add Export Button */}
      <Button
        onClick={exportToPDF}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
        disabled={students.length === 0}
      >
        <Download className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  </CardContent>
</Card>



        {/* Students Table */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
            <CardTitle className="text-lg">Students List ({students.length} students)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <div className="text-lg font-medium text-gray-600">Loading students...</div>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="flex justify-center items-center h-64 bg-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <div className="text-lg font-medium text-gray-500">No students found</div>
                  <div className="text-sm text-gray-400">Try adjusting your search filters</div>
                </div>
              </div>
            ) : (
              <div className="max-w-full">
                {students.map((student, index) => {
                  return (
                    <div
                      key={student.student_id}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors duration-150`}
                    >
                      {/* Summary Row */}
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Main Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              {/* Name */}
                              <div className="flex-1 min-w-0">
                                {editingId === student.student_id ? (
                                  <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleEditChange("name", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Student Name"
                                    required
                                  />
                                ) : (
                                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {student.name || "No Name"}
                                  </h3>
                                )}
                              </div>

                              {/* Class & Roll */}
                              <div className="flex gap-2 flex-wrap">
                                {editingId === student.student_id ? (
                                  <>
                                    <select
                                      value={editData.class}
                                      onChange={(e) => handleEditChange("class", e.target.value)}
                                      className="px-3 py-1 border border-gray-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    >
                                      <option value="">Class</option>
                                      {classOptions.map((cls) => (
                                        <option key={cls} value={cls}>
                                          {cls}
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      type="text"
                                      value={editData.roll_number}
                                      onChange={(e) => handleEditChange("roll_number", e.target.value)}
                                      className="px-3 py-1 border border-gray-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Roll No"
                                      required
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                      Class {student.class || "-"}
                                    </span>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                                      Roll: {student.roll_number || "-"}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Quick Info */}
                            <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                              <span>📱 {student.mobile_number || "No Mobile"}</span>
                              <span>👤 {student.gender || "No Gender"}</span>
                              <span>📅 {formatDateForDisplay(student.dob) || "No DOB"}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {editingId === student.student_id ? (
                              <>
                                <button
                                  onClick={() => saveChanges(student.student_id)}
                                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200"
                                  title="Save Changes"
                                >
                                  <Save className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                                  title="Cancel Edit"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => startEdit(student)}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                title="Edit Student"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                            )}

                            <button
                              onClick={() => toggleExpand(student.student_id)}
                              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                              title={isExpanded[student.student_id] ? "Collapse Details" : "Expand Details"}
                            >
                              <svg
                                className={`h-5 w-5 transform transition-transform duration-200 ${isExpanded[student.student_id] ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded[student.student_id] && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 bg-gray-50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {/* Personal Information */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
                                Personal Information
                              </h4>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                                  {editingId === student.student_id ? (
                                    <select
                                      value={editData.gender}
                                      onChange={(e) => handleEditChange("gender", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    >
                                      <option value="">Select</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.gender || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="date"
                                      value={editData.dob}
                                      onChange={(e) => handleEditChange("dob", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">
                                      {formatDateForDisplay(student.dob) || "-"}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Aadhaar Number</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.aadhaar_number}
                                      onChange={(e) => handleEditChange("aadhaar_number", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800 font-mono">
                                      {student.aadhaar_number || "-"}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Height (cm)</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="number"
                                      value={editData.height_cm}
                                      onChange={(e) => handleEditChange("height_cm", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">
                                      {student.height_cm ? `${student.height_cm} cm` : "-"}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Weight (kg)</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="number"
                                      value={editData.weight_kg}
                                      onChange={(e) => handleEditChange("weight_kg", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">
                                      {student.weight_kg ? `${student.weight_kg} kg` : "-"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Academic Information */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
                                Academic Information
                              </h4>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Medium</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.medium}
                                      onChange={(e) => handleEditChange("medium", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.medium || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Session</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.session}
                                      onChange={(e) => handleEditChange("session", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.session || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Is Repeater</label>
                                  {editingId === student.student_id ? (
                                    <select
                                      value={editData.is_repeater}
                                      onChange={(e) => handleEditChange("is_repeater", Number.parseInt(e.target.value))}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    >
                                      <option value={0}>No</option>
                                      <option value={1}>Yes</option>
                                    </select>
                                  ) : (
                                    <span
                                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        student.is_repeater
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {student.is_repeater ? "Yes" : "No"}
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">SSSMID</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.sssmid}
                                      onChange={(e) => handleEditChange("sssmid", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800 font-mono">{student.sssmid || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.category}
                                      onChange={(e) => handleEditChange("category", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                                      {student.category || "-"}
                                    </span>
                                  )}
                                </div>
                                {/* PEN Number */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">PEN Number</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="number"
                                      value={editData.PEN_Number}
                                      onChange={(e) => handleEditChange("PEN_Number", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  ) : (
                                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                      {student.PEN_Number || "-"}
                                    </span>
                                  )}
                                </div>
                                {/* APAAR Number */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">APAAR Number</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="number"
                                      value={editData.APAAR_Number}
                                      onChange={(e) => handleEditChange("APAAR_Number", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  ) : (
                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                      {student.APAAR_Number || "-"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Contact & Family Information */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
                                Contact & Family
                              </h4>

                              <div className="space-y-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Number</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.mobile_number}
                                      onChange={(e) => handleEditChange("mobile_number", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800 font-mono">
                                      {student.mobile_number || "-"}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                                  {editingId === student.student_id ? (
                                    <textarea
                                      value={editData.address}
                                      onChange={(e) => handleEditChange("address", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                      rows="2"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.address || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Pincode</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.pincode}
                                      onChange={(e) => handleEditChange("pincode", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800 font-mono">{student.pincode || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Father's Name</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.father_name}
                                      onChange={(e) => handleEditChange("father_name", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.father_name || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Mother's Name</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.mother_name}
                                      onChange={(e) => handleEditChange("mother_name", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">{student.mother_name || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Admission Number
                                  </label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="text"
                                      value={editData.admission_no}
                                      onChange={(e) => handleEditChange("admission_no", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800 font-mono">{student.admission_no || "-"}</div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">Admission Date</label>
                                  {editingId === student.student_id ? (
                                    <input
                                      type="date"
                                      value={editData.admission_date}
                                      onChange={(e) => handleEditChange("admission_date", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                    />
                                  ) : (
                                    <div className="text-sm text-gray-800">
                                      {formatDateForDisplay(student.admission_date) || "-"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Students
