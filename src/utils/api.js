import axios from 'axios';

const ApiUrl = import.meta.env.VITE_BASE_URL;

// Always send cookies with every request
axios.defaults.withCredentials = true;

export const getClasses = () => axios.get(`${ApiUrl}/classes`);
export const getExams = (className) => axios.get(`${ApiUrl}/exams`, { params: className ? { class: className } : undefined });
export const getAdmitCardData = (className, examId, session) =>
  axios.get(`${ApiUrl}/admit-card-data`, {
    params: { className, examId, session }
  });

export const getSchedules = (className, examId) =>
  axios.get(`${ApiUrl}/exam-schedules`, { params: { className, examId } });

export const addSchedule = (data) =>
  axios.post(`${ApiUrl}/exam-schedules`, data);

export const editSchedule = (data) =>
  axios.put(`${ApiUrl}/exam-schedules`, data);

export const deleteSchedule = (schedule_id) =>
  axios.delete(`${ApiUrl}/exam-schedules/${schedule_id}`);
