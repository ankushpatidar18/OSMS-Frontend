import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { User, Users, GraduationCap, Ruler, Shield, FileText, CheckCircle, XCircle } from "lucide-react"
import axios from "axios"

const ApiUrl = import.meta.env.VITE_BASE_URL

const classOptions = ["KG1", "KG2", "1", "2", "3", "4", "5", "6", "7", "8"]
const genderOptions = ["Male", "Female"]
const categoryOptions = ["GENERAL", "OBC", "SC", "ST"]
const mediumOptions = ["Hindi", "English"]
const sessionOptions = Array.from({ length: 11 }, (_, i) => `${2023 + i}-${2024 + i}`)

export default function AddStudentForm() {
  const [formData, setFormData] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMsg, setDialogMsg] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Client-side validation for required fields
    if (!formData.name || !formData.class || !formData.session) {
      setDialogMsg("Please fill in all required fields: Name, Class, and Session.")
      setIsSuccess(false)
      setDialogOpen(true)
      return
    }
    try {
      await axios.post(`${ApiUrl}/students/full-register`, formData, { withCredentials: true })
      setDialogMsg("Student registered successfully!")
      setIsSuccess(true)
      setDialogOpen(true)
      setFormData({})
    } catch (err) {
      setDialogMsg("Error registering student. Please try again.")
      setIsSuccess(false)
      setDialogOpen(true)
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Add New Student</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in the student information below to register a new student in the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Details */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Student Details</h2>
                  <p className="text-blue-100 text-sm">Basic information about the student</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <Input
                    placeholder="Enter student's full name"
                    value={formData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <Select value={formData.gender || ""} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.dob || ""}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Aadhaar Number</label>
                  <Input
                    placeholder="Enter 12-digit Aadhaar number"
                    value={formData.aadhaar_number || ""}
                    onChange={(e) => handleChange("aadhaar_number", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                  <Input
                    placeholder="Enter mobile number"
                    value={formData.mobile_number || ""}
                    onChange={(e) => handleChange("mobile_number", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Pincode</label>
                  <Input
                    placeholder="Enter pincode"
                    value={formData.pincode || ""}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <Textarea
                    placeholder="Enter complete address"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">SSSMID</label>
                  <Input
                    placeholder="Enter SSSMID"
                    value={formData.sssmid || ""}
                    onChange={(e) => handleChange("sssmid", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Class *</label>
                  <Select value={formData.class || ""} onValueChange={(value) => handleChange("class", value)} required>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          Class {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Medium</label>
                  <Select value={formData.medium || ""} onValueChange={(value) => handleChange("medium", value)}>
                    <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select Medium" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediumOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Session *</label>
                  <Select
                    value={formData.session || ""}
                    onValueChange={(value) => handleChange("session", value)}
                    required
                  >
                    <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Roll Number</label>
                  <Input
                    type="number"
                    placeholder="Enter roll number"
                    value={formData.roll_number || ""}
                    onChange={(e) => handleChange("roll_number", e.target.value)}
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Details */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Parent Details</h2>
                  <p className="text-green-100 text-sm">Information about student's parents</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Father's Name</label>
                  <Input
                    placeholder="Enter father's full name"
                    value={formData.father_name || ""}
                    onChange={(e) => handleChange("father_name", e.target.value)}
                    className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mother's Name</label>
                  <Input
                    placeholder="Enter mother's full name"
                    value={formData.mother_name || ""}
                    onChange={(e) => handleChange("mother_name", e.target.value)}
                    className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admission Details */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Admission Details</h2>
                  <p className="text-purple-100 text-sm">Admission related information</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Admission Number</label>
                  <Input
                    placeholder="Enter admission number"
                    value={formData.admission_no || ""}
                    onChange={(e) => handleChange("admission_no", e.target.value)}
                    className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Admission Date</label>
                  <Input
                    type="date"
                    value={formData.admission_date || ""}
                    onChange={(e) => handleChange("admission_date", e.target.value)}
                    className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Info */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Ruler className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Physical Information</h2>
                  <p className="text-orange-100 text-sm">Height and weight details</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Height (cm)</label>
                  <Input
                    placeholder="Enter height in centimeters"
                    value={formData.height_cm || ""}
                    onChange={(e) => handleChange("height_cm", e.target.value)}
                    className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Weight (kg)</label>
                  <Input
                    placeholder="Enter weight in kilograms"
                    value={formData.weight_kg || ""}
                    onChange={(e) => handleChange("weight_kg", e.target.value)}
                    className="h-11 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Info */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Social Information</h2>
                  <p className="text-teal-100 text-sm">Category and social details</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <Select value={formData.category || ""} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger className="h-11 border-gray-300 focus:border-teal-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Additional Information</h2>
                  <p className="text-indigo-100 text-sm">Other important details</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">APAAR Number</label>
                  <Input
                    placeholder="Enter APAAR number"
                    value={formData.APAAR_Number || ""}
                    onChange={(e) => handleChange("APAAR_Number", e.target.value)}
                    className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">PEN Number</label>
                  <Input
                    placeholder="Enter PEN number"
                    value={formData.PEN_Number || ""}
                    onChange={(e) => handleChange("PEN_Number", e.target.value)}
                    className="h-11 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pb-8">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <User className="h-5 w-5 mr-2" />
              Register Student
            </Button>
          </div>
        </form>
      </div>

      {/* Dialog for Success/Error Feedback */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              {isSuccess ? (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              )}
              <DialogTitle className={`text-lg font-semibold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
                {isSuccess ? "Registration Successful" : "Registration Failed"}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">{dialogMsg}</p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setDialogOpen(false)}
              className={`${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
