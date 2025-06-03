import React, { useState } from 'react';
import AdmitCardGenerator from './AdmitCardGenerator';
import ExamScheduleManager from './ExamScheduleManager';

const classOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

export default function SelectClass() {
  const [selectedClass, setSelectedClass] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-4">
        <label htmlFor="class-select" className="mr-2 font-bold">Select Class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select a class</option>
          {classOptions.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      {selectedClass && (
        <>
          <ExamScheduleManager className={selectedClass} />
          
          <AdmitCardGenerator className={selectedClass} />
        </>
      )}
    </div>
  );
}
