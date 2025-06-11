import { useState } from "react"
import useMarkEntry from "../hooks/useMarkEntry"
import ClassSelector from "../components/MarkEntry/ClassSelector"
import SubjectExamSelector from "../components/MarkEntry/SubjectExamSelector"
import MarksTable from "../components/MarkEntry/MarksTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Save, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function MarkEntryPage() {
  const {
    classes,
    selectedClass,
    setSelectedClass,
    subjects,
    selectedSubject,
    setSelectedSubject,
    exams,
    selectedExam,
    setSelectedExam,
    students,
    marksData,
    handleMarkChange,
    submitMarks,
    isLoading,
    error,
  } = useMarkEntry()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSuccessMessage("")
    const success = await submitMarks()
    setIsSubmitting(false)
    if (success) {
      setSuccessMessage("Marks saved successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } else {
      // Error is already handled by the hook
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">Student Mark Entry</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter and manage student examination marks for different classes, subjects, and exams
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="animate-shake">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {successMessage && (
          <Alert className="bg-green-50 text-green-800 border-green-200 animate-fade-in">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class Selection */}
          <Card className="shadow-md border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="text-lg">Select Class</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ClassSelector
                classes={classes}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* Subject & Exam Selection */}
          <Card className="shadow-md border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <CardTitle className="text-lg">Select Subject & Exam</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <SubjectExamSelector
                subjects={subjects}
                exams={exams}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedExam={selectedExam}
                setSelectedExam={setSelectedExam}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>

        {/* Marks Table */}
        {students.length > 0 ? (
          <Card className="shadow-md border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white flex flex-row justify-between items-center">
              <CardTitle className="text-lg">
                {selectedClass && selectedSubject && selectedExam ? (
                  <>
                    Marks for Class {selectedClass} - {selectedSubject} ({selectedExam})
                  </>
                ) : (
                  "Student Marks"
                )}
              </CardTitle>
              <div className="text-sm text-gray-300">{students.length} Students</div>
            </CardHeader>
            <CardContent className="p-0">
              <MarksTable marksData={marksData} handleMarkChange={handleMarkChange} isLoading={isLoading} />

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedSubject || !selectedExam || isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Marks
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : selectedClass && !isLoading ? (
          <Card className="shadow-md border-0 p-12 text-center">
            <div className="text-gray-500">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium mb-2">No Students Found</h3>
              <p>Please select a different class or check if students are enrolled</p>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
