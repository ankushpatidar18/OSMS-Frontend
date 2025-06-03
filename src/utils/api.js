
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getClasses = () => axios.get(`${API_URL}/classes`);
export const getExams = () => axios.get(`${API_URL}/exams`);
export const getAdmitCardData = (className, examId) =>
  axios.get(`${API_URL}/admit-card-data`, {
    params: { className, examId }
  });

  // ...existing imports
export const getSchedules = (className, examId) =>
  axios.get(`${API_URL}/exam-schedules`, { params: { className, examId } });

export const addSchedule = (data) =>
  axios.post(`${API_URL}/exam-schedules`, data);

export const editSchedule = (data) =>
  axios.put(`${API_URL}/exam-schedules`, data);

export const deleteSchedule = (schedule_id) =>
  axios.delete(`${API_URL}/exam-schedules/${schedule_id}`);
