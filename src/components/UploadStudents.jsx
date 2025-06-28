import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import axios from "axios"
const ApiUrl = import.meta.env.VITE_BASE_URL;

const UploadStudents = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setMessage("")
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls")) {
        setFile(droppedFile)
        setMessage("")
      } else {
        setMessage("Please upload only Excel files (.xlsx or .xls)")
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(
        `${ApiUrl}/upload/students`,
        formData,
        { withCredentials: true }
      )

      const data = response.data

      setMessage("success:" + data.message)
      setFile(null) // Clear file after successful upload
    } catch (error) {
      setMessage(
        "error:" +
          (error.response?.data?.message ||
            "Error uploading file. Backend might be down.")
      )
    } finally {
      setIsUploading(false)
    }
  }

  const getMessageIcon = () => {
    if (message.startsWith("success:")) {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (message.startsWith("error:")) {
      return <XCircle className="h-5 w-5 text-red-600" />
    } else {
      return <AlertCircle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getMessageColor = () => {
    if (message.startsWith("success:")) {
      return "text-green-700 bg-green-50 border-green-200"
    } else if (message.startsWith("error:")) {
      return "text-red-700 bg-red-50 border-red-200"
    } else {
      return "text-yellow-700 bg-yellow-50 border-yellow-200"
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Upload Student Data</CardTitle>
          <CardDescription className="text-gray-600">
            Upload an Excel file (.xlsx) containing student information to add them to the system
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : file
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />

            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className={`h-6 w-6 ${dragActive ? "text-blue-600" : "text-gray-400"}`} />
              </div>

              {file ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">File Selected:</p>
                  <div className="bg-white border border-green-200 rounded-md p-3">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="flex flex-wrap items-center space-x-2">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                        <span className="text-xs font-medium text-gray-700">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    {dragActive ? "Drop your file here" : "Choose a file or drag it here"}
                  </p>
                  <p className="text-sm text-gray-500">Supports Excel files (.xlsx, .xls) up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Students
                </>
              )}
            </Button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`flex items-center space-x-2 p-4 rounded-lg border ${getMessageColor()}`}>
              {getMessageIcon()}
              <p className="text-sm font-medium">{message.replace(/^(success:|error:)/, "")}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">File Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Excel format (<b>.xlsx</b> or <b>.xls</b>)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• <b>First row must contain column headers with <span className="text-blue-700">exactly these names and order</span>:</b></li>
              <li className="pl-4">
                <span className="font-mono text-xs block bg-white border rounded p-2 mt-1">
                  Name, Gender, DOB, AADHAAR No., Address, Pincode, Student State Code, Class, Medium Of Instruction, Session, Mobile No., Father Name, Mother Name, Admission No., Admission Date, Height in CMs, Weight in KGs, Social Category
                </span>
              </li>
              <li>• All columns are required, even if some values are empty.</li>
              <li>• Dates should be in a valid Excel date format.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadStudents
