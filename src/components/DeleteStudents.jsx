import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const sessions = Array.from({ length: 11 }, (_, i) => {
  const start = 2023 + i;
  return `${start}-${start + 1}`;
});

const classes = ['KG1', 'KG2', '1', '2', '3', '4', '5', '6', '7', '8'];

export default function DeleteStudents() {
  const [session, setSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (session && selectedClass) {
      axios
        .get(`http://localhost:5000/api/students/filter?session=${session}&class=${selectedClass}`)
        .then((res) => setStudents(Array.isArray(res.data) ? res.data : []))
        .catch(() => setStudents([]));
    }
  }, [session, selectedClass]);

  const toggleStudent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return alert('No students selected.');
    try {
      await axios.delete('http://localhost:5000/api/students/delete-many', {
        data: { studentIds: selectedIds },
      });
      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s.student_id)));
      setSelectedIds([]);
      alert('Selected students deleted successfully.');
    } catch (err) {
      alert('Failed to delete students.' + err.message);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1">Select Session</label>
            <Select onValueChange={setSession}>
              <SelectTrigger className="w-full">Select Session</SelectTrigger>
              <SelectContent>
                {sessions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-medium block mb-1">Select Class</label>
            <Select onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full">Select Class</SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="mt-6 max-h-[400px] border rounded-lg">
        {Array.isArray(students) && students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.student_id}
              className="flex items-center justify-between border-b px-4 py-2"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-base">
                  {student.name} ({student.admission_no || 'N/A'})
                </p>
                <p className="text-sm text-gray-500">
                  Father: {student.father_name || 'N/A'} | Mother: {student.mother_name || 'N/A'}
                </p>
              </div>
              <Checkbox
                checked={selectedIds.includes(student.student_id)}
                onCheckedChange={() => toggleStudent(student.student_id)}
              />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">No students found.</div>
        )}
      </ScrollArea>

      <div className="mt-4 text-center">
        <Button onClick={deleteSelected} className="bg-red-600 hover:bg-red-700 text-white">
          Delete Selected Students
        </Button>
      </div>
    </div>
  );
}
