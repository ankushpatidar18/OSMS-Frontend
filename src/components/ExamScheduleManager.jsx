import React, { useState, useEffect } from 'react';
import { 
  getSchedules, 
  addSchedule, 
  editSchedule, 
  deleteSchedule, 
  getExams,
  getClasses 
} from '../utils/api';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function ExamScheduleManager() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    subject_id: '',
    exam_date: '',
    exam_day: 'Monday',
    exam_time: '09:00 to 12:00'
  });
  const [editId, setEditId] = useState(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogType, setDialogType] = useState('info');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Fetch classes on mount
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        const res = await getClasses();
        setClasses(res.data || []); 
      } catch (err) {
        setError(err.message || 'Failed to fetch classes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Fetch exams and subjects when class changes
  useEffect(() => {
    if (!selectedClass) {
      setExams([]);
      setSubjects([]);
      setSelectedExam('');
      return;
    }
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [examsRes, subjectsRes] = await Promise.all([
          getExams(selectedClass),
          axios.get(
            `${ApiUrl}/subjects?class=` + encodeURIComponent(selectedClass),
            { withCredentials: true }
          ).then(res => res.data)
        ]);
        setExams(examsRes.data);
        setSubjects(subjectsRes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [selectedClass]);

  // Fetch schedules when exam changes
  useEffect(() => {
    if (!selectedClass || !selectedExam) {
      setSchedules([]);
      return;
    }
    const fetchSchedulesData = async () => {
      setIsLoading(true);
      try {
        const res = await getSchedules(selectedClass, selectedExam);
        setSchedules(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedulesData();
  }, [selectedExam, selectedClass]);

  const resetForm = () => {
    setForm({
      subject_id: '',
      exam_date: '',
      exam_day: 'Monday',
      exam_time: '09:00 to 12:00'
    });
    setEditId(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'exam_date') {
      // Auto-fill day based on selected date
      const dateObj = new Date(value);
      const dayName = daysOfWeek[dateObj.getDay()] || '';
      setForm(form => ({
        ...form,
        exam_date: value,
        exam_day: dayName
      }));
    } else {
      setForm(form => ({
        ...form,
        [name]: value
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!form.subject_id || !form.exam_date) {
      setError('Please fill all required fields');
      return;
    }
    try {
      if (editId) {
        await editSchedule({ schedule_id: editId, ...form });
      } else {
        await addSchedule({
          exam_id: selectedExam,
          class_name: selectedClass, 
          ...form
        });
      }
      const res = await getSchedules(selectedClass, selectedExam);
      setSchedules(res.data);
      resetForm();
      setDialogMsg(editId ? 'Schedule updated successfully.' : 'Schedule added successfully.');
      setDialogType('success');
      setDialogOpen(true);
    } catch (err) {
      setDialogMsg(err.message || 'Operation failed');
      setDialogType('error');
      setDialogOpen(true);
    }
  };

  const handleEdit = schedule => {
    setEditId(schedule.schedule_id);
    setForm({
      subject_id: schedule.subject_id,
      exam_date: schedule.exam_date.slice(0, 10),
      exam_day: schedule.exam_day,
      exam_time: schedule.exam_time
    });
  };

  // Show confirmation dialog instead of window.confirm
  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setDialogMsg('Are you sure you want to delete this schedule? This action cannot be undone.');
    setDialogType('confirm');
    setDialogOpen(true);
  };

  // Actual deletion logic
  const confirmDelete = async () => {
    setDialogOpen(false);
    setIsLoading(true);
    try {
      await deleteSchedule(pendingDeleteId);
      const res = await getSchedules(selectedClass, selectedExam);
      setSchedules(res.data);
      setDialogMsg('Schedule deleted successfully.');
      setDialogType('success');
      setDialogOpen(true);
    } catch (err) {
      setDialogMsg(err.message || 'Failed to delete schedule');
      setDialogType('error');
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
      setPendingDeleteId(null);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-white rounded shadow mt-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Manage Exam Schedule</h3>

      {/* Class Selection Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Select Class:
          <select
            className="border p-2 rounded w-full mt-1"
            value={selectedClass}
            onChange={e => {
              setSelectedClass(e.target.value);
              setSelectedExam('');
              setSchedules([]);
              setSubjects([]);
            }}
            aria-label="Select class"
          >
            <option value="">Choose a class</option>
            {classes.map(cls => (
              <option 
                key={cls.class} 
                value={cls.class}
              >
                {cls.class}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Exam Selection Dropdown */}
      {selectedClass && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select Exam:
            <select
              className="border p-2 rounded w-full mt-1"
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              aria-label="Select exam"
            >
              <option value="">Choose an exam</option>
              {exams.map(e => (
                <option key={e.exam_id} value={e.exam_id}>
                  {e.name} ({e.session}){e.class_group}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Schedule Form and Table */}
      {selectedExam && (
        <>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-1 font-medium">
                Subject:
                <select
                  name="subject_id"
                  value={form.subject_id}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                  aria-label="Select subject"
                >
                  <option value="">Choose subject</option>
                  {subjects.map(s => (
                    <option key={s.subject_id} value={s.subject_id}>
                      {s.subject_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block mb-1 font-medium">
                Date:
                <input
                  type="date"
                  name="exam_date"
                  value={form.exam_date}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block mb-1 font-medium">
                Day:
                <input
                  type="text"
                  name="exam_day"
                  value={form.exam_day}
                  onChange={handleChange}
                  placeholder="Day"
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block mb-1 font-medium">
                Time:
                <input
                  type="text"
                  name="exam_time"
                  value={form.exam_time}
                  onChange={handleChange}
                  placeholder="Time"
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
            </div>
            <div className="flex gap-2 items-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                aria-label={editId ? 'Update schedule' : 'Add schedule'}
              >
                {editId ? 'Update' : 'Add'}
              </button>
              {editId && (
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={resetForm}
                  aria-label="Cancel edit"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Schedules Table */}
          <table className="w-full mt-2 border">
            <thead>
              <tr>
                <th className="border p-1">Subject</th>
                <th className="border p-1">Date</th>
                <th className="border p-1">Day</th>
                <th className="border p-1">Time</th>
                <th className="border p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(s => (
                <tr key={s.schedule_id}>
                  <td className="border p-1">{s.subject_name}</td>
                  <td className="border p-1">{s.exam_date.slice(0, 10)}</td>
                  <td className="border p-1">{s.exam_day}</td>
                  <td className="border p-1">{s.exam_time}</td>
                  <td className="border p-1">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(s)}
                    >Edit</button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(s.schedule_id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {schedules.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-2">No schedules found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Dialog for Confirmation and Feedback */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'confirm'
                ? 'Confirm Deletion'
                : dialogType === 'success'
                ? 'Success'
                : dialogType === 'error'
                ? 'Error'
                : 'Info'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">{dialogMsg}</div>
          <DialogFooter>
            {dialogType === 'confirm' ? (
              <>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => setDialogOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
