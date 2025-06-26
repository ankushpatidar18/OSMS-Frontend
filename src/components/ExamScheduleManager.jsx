"use client"

import { useState, useEffect } from "react"
import { getSchedules, addSchedule, editSchedule, deleteSchedule, getExams, getClasses } from "../utils/api"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  Edit2,
  Trash2,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react"

const ApiUrl = import.meta.env.VITE_BASE_URL

export default function ExamScheduleManager() {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [exams, setExams] = useState([])
  const [selectedExam, setSelectedExam] = useState("")
  const [schedules, setSchedules] = useState([])
  const [subjects, setSubjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    subject_id: "",
    exam_date: "",
    exam_day: "Monday",
    exam_time: "09:00 to 12:00",
  })
  const [editId, setEditId] = useState(null)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMsg, setDialogMsg] = useState("")
  const [dialogType, setDialogType] = useState("info")
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // Fetch classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true)
      try {
        const res = await getClasses()
        setClasses(res.data || [])
      } catch (err) {
        setError(err.message || "Failed to fetch classes")
      } finally {
        setIsLoading(false)
      }
    }
    fetchClasses()
  }, [])

  // Fetch exams and subjects when class changes
  useEffect(() => {
    if (!selectedClass) {
      setExams([])
      setSubjects([])
      setSelectedExam("")
      return
    }
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        const [examsRes, subjectsRes] = await Promise.all([
          getExams(selectedClass),
          axios
            .get(`${ApiUrl}/subjects/for-class/${encodeURIComponent(selectedClass)}`, { withCredentials: true })
            .then((res) => res.data),
        ])
        setExams(examsRes.data)
        setSubjects(subjectsRes)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInitialData()
  }, [selectedClass])

  // Fetch schedules when exam changes
  useEffect(() => {
    if (!selectedClass || !selectedExam) {
      setSchedules([])
      return
    }
    const fetchSchedulesData = async () => {
      setIsLoading(true)
      try {
        const res = await getSchedules(selectedClass, selectedExam)
        setSchedules(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSchedulesData()
  }, [selectedExam, selectedClass])

  const resetForm = () => {
    setForm({
      subject_id: "",
      exam_date: "",
      exam_day: "Monday",
      exam_time: "09:00 to 12:00",
    })
    setEditId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "exam_date") {
      // Auto-fill day based on selected date
      const dateObj = new Date(value)
      const dayName = daysOfWeek[dateObj.getDay()] || ""
      setForm((form) => ({
        ...form,
        exam_date: value,
        exam_day: dayName,
      }))
    } else {
      setForm((form) => ({
        ...form,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!form.subject_id || !form.exam_date) {
      setError("Please fill all required fields")
      return
    }
    try {
      if (editId) {
        await editSchedule({ schedule_id: editId, ...form })
      } else {
        await addSchedule({
          exam_id: selectedExam,
          class_name: selectedClass,
          ...form,
        })
      }
      const res = await getSchedules(selectedClass, selectedExam)
      setSchedules(res.data)
      resetForm()
      setDialogMsg(editId ? "Schedule updated successfully." : "Schedule added successfully.")
      setDialogType("success")
      setDialogOpen(true)
    } catch (err) {
      setDialogMsg(err.message || "Operation failed")
      setDialogType("error")
      setDialogOpen(true)
    }
  }

  const handleEdit = (schedule) => {
    setEditId(schedule.schedule_id)
    setForm({
      subject_id: schedule.subject_id,
      exam_date: schedule.exam_date.slice(0, 10),
      exam_day: schedule.exam_day,
      exam_time: schedule.exam_time,
    })
  }

  // Show confirmation dialog instead of window.confirm
  const handleDelete = (id) => {
    setPendingDeleteId(id)
    setDialogMsg("Are you sure you want to delete this schedule? This action cannot be undone.")
    setDialogType("confirm")
    setDialogOpen(true)
  }

  // Actual deletion logic
  const confirmDelete = async () => {
    setDialogOpen(false)
    setIsLoading(true)
    try {
      await deleteSchedule(pendingDeleteId)
      const res = await getSchedules(selectedClass, selectedExam)
      setSchedules(res.data)
      setDialogMsg("Schedule deleted successfully.")
      setDialogType("success")
      setDialogOpen(true)
    } catch (err) {
      setDialogMsg(err.message || "Failed to delete schedule")
      setDialogType("error")
      setDialogOpen(true)
    } finally {
      setIsLoading(false)
      setPendingDeleteId(null)
    }
  }

  const getDialogIcon = () => {
    switch (dialogType) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-600" />
      case "confirm":
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      default:
        return <AlertCircle className="h-6 w-6 text-blue-600" />
    }
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Exam Schedule Manager</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create and manage examination schedules for different classes and subjects
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class Selection */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Select Class</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Select
                value={selectedClass}
                onValueChange={(value) => {
                  setSelectedClass(value)
                  setSelectedExam("")
                  setSchedules([])
                  setSubjects([])
                }}
              >
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.class} value={cls.class}>
                      Class {cls.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Exam Selection */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Select Exam</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Select value={selectedExam} onValueChange={setSelectedExam} disabled={!selectedClass}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 disabled:bg-gray-100">
                  <SelectValue placeholder={selectedClass ? "Choose an exam" : "Select class first"} />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((e) => (
                    <SelectItem key={e.exam_id} value={e.exam_id}>
                      {e.name} ({e.session}){e.class_group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Form and Table */}
        {selectedExam && (
          <>
            {/* Add/Edit Form */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center space-x-2">
                  {editId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  <span>{editId ? "Edit Schedule" : "Add New Schedule"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Subject Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Subject *</label>
                      <Select
                        value={form.subject_id}
                        onValueChange={(value) => setForm((prev) => ({ ...prev, subject_id: value }))}
                        required
                      >
                        <SelectTrigger className="h-11 border-gray-300 focus:border-green-500">
                          <SelectValue placeholder="Choose subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((s) => (
                            <SelectItem key={s.subject_id} value={s.subject_id}>
                              {s.subject_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Date *</label>
                      <Input
                        type="date"
                        name="exam_date"
                        value={form.exam_date}
                        onChange={handleChange}
                        required
                        className="h-11 border-gray-300 focus:border-green-500"
                      />
                    </div>

                    {/* Day */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Day</label>
                      <Input
                        type="text"
                        name="exam_day"
                        value={form.exam_day}
                        onChange={handleChange}
                        placeholder="Day"
                        required
                        className="h-11 border-gray-300 focus:border-green-500"
                        readOnly
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Time *</label>
                      <Input
                        type="text"
                        name="exam_time"
                        value={form.exam_time}
                        onChange={handleChange}
                        placeholder="e.g., 09:00 to 12:00"
                        required
                        className="h-11 border-gray-300 focus:border-green-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                    >
                      {editId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      <span>{editId ? "Update Schedule" : "Add Schedule"}</span>
                    </Button>
                    {editId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Schedules Table */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Exam Schedules</span>
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {schedules.length} Schedule{schedules.length !== 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Horizontal scroll container for small screens */}
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[150px]">
                            Subject
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[120px]">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[100px]">Day</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 min-w-[140px]">
                            Time
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 min-w-[120px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {schedules.map((s, index) => (
                          <tr
                            key={s.schedule_id}
                            className={`hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{s.subject_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{s.exam_date.slice(0, 10)}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {s.exam_day}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{s.exam_time}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(s)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(s.schedule_id)}
                                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {schedules.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="text-gray-500">
                                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium mb-2">No schedules found</h3>
                                <p className="text-sm">Add your first exam schedule using the form above</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Empty State when no exam selected */}
        {!selectedExam && selectedClass && (
          <Card className="shadow-lg border-0 p-12 text-center">
            <div className="text-gray-500">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium mb-2">Select an Exam</h3>
              <p>Choose an exam from the dropdown above to view and manage schedules</p>
            </div>
          </Card>
        )}

        {/* Empty State when no class selected */}
        {!selectedClass && (
          <Card className="shadow-lg border-0 p-12 text-center">
            <div className="text-gray-500">
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium mb-2">Get Started</h3>
              <p>Select a class from the dropdown above to begin managing exam schedules</p>
            </div>
          </Card>
        )}
      </div>

      {/* Dialog for Confirmation and Feedback */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  dialogType === "success"
                    ? "bg-green-100"
                    : dialogType === "error"
                      ? "bg-red-100"
                      : dialogType === "confirm"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                }`}
              >
                {getDialogIcon()}
              </div>
              <DialogTitle
                className={`text-lg font-semibold ${
                  dialogType === "success"
                    ? "text-green-800"
                    : dialogType === "error"
                      ? "text-red-800"
                      : dialogType === "confirm"
                        ? "text-yellow-800"
                        : "text-blue-800"
                }`}
              >
                {dialogType === "confirm"
                  ? "Confirm Deletion"
                  : dialogType === "success"
                    ? "Success"
                    : dialogType === "error"
                      ? "Error"
                      : "Info"}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">{dialogMsg}</p>
          </div>
          <DialogFooter>
            {dialogType === "confirm" ? (
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                  Yes, Delete
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setDialogOpen(false)}
                className={`${
                  dialogType === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : dialogType === "error"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                OK
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
