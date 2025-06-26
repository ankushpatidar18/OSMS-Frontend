import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Calendar, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ApiUrl = import.meta.env.VITE_BASE_URL;

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
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogType, setDialogType] = useState('info'); // 'info', 'confirm', 'success', 'error'

  useEffect(() => {
    if (session && selectedClass) {
      setLoading(true);
      axios
        .get(
          `${ApiUrl}/students/filter?session=${session}&class=${selectedClass}`,
          { withCredentials: true }
        )
        .then((res) => {
          setStudents(Array.isArray(res.data) ? res.data : []);
          setSelectedIds([]); // Reset selections when changing filters
        })
        .catch(() => setStudents([]))
        .finally(() => setLoading(false));
    } else {
      setStudents([]);
      setSelectedIds([]);
    }
  }, [session, selectedClass]);

  const toggleStudent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.student_id));
    }
  };

  // Show confirmation dialog instead of window.confirm
  const handleDeleteClick = () => {
    if (selectedIds.length === 0) {
      setDialogMsg('No students selected.');
      setDialogType('info');
      setDialogOpen(true);
      return;
    }
    setDialogMsg(`Are you sure you want to delete ${selectedIds.length} student(s)? This action cannot be undone.`);
    setDialogType('confirm');
    setDialogOpen(true);
  };

  // Actual deletion logic
  const deleteSelected = async () => {
    setDialogOpen(false);
    setLoading(true);
    try {
      await axios.delete(
        `${ApiUrl}/students/delete-many`,
        {
          data: { studentIds: selectedIds },
          withCredentials: true
        }
      );
      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s.student_id)));
      setSelectedIds([]);
      setDialogMsg('Selected students deleted successfully.');
      setDialogType('success');
      setDialogOpen(true);
    } catch (err) {
      setDialogMsg('Failed to delete students: ' + (err.message || 'Unknown error'));
      setDialogType('error');
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Delete Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-2">Select Session</label>
              <Select onValueChange={setSession} value={session}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose session..." />
                </SelectTrigger>
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
              <label className="font-medium block mb-2">Select Class</label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Filters Display */}
      {(session || selectedClass) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-medium text-blue-900">Current Selection:</span>
              {session && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Session: {session}
                </Badge>
              )}
              {selectedClass && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Class: {selectedClass}
                </Badge>
              )}
              {students.length > 0 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {students.length} students found
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      {session && selectedClass && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap">
              <CardTitle className="text-lg">Students List</CardTitle>
              {students.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedIds.length} of {students.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                    className="text-xs"
                  >
                    {selectedIds.length === students.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] border-t">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading students...
                </div>
              ) : Array.isArray(students) && students.length > 0 ? (
                <div className="divide-y">
                  {students.map((student, index) => (
                    <div
                      key={student.student_id}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        selectedIds.includes(student.student_id) ? 'bg-red-50 border-l-4 border-l-red-400' : ''
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-mono">
                            #{index + 1}
                          </span>
                          <p className="font-semibold text-base">
                            {student.name}
                          </p>
                          {student.admission_no && (
                            <Badge variant="outline" className="text-xs">
                              {student.admission_no}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Father:</span> {student.father_name || 'N/A'} • 
                          <span className="font-medium ml-2">Mother:</span> {student.mother_name || 'N/A'}
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedIds.includes(student.student_id)}
                        onCheckedChange={() => toggleStudent(student.student_id)}
                        className="ml-4"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {session && selectedClass 
                      ? 'No students found for the selected session and class.' 
                      : 'Please select both session and class to view students.'}
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Fixed Delete Button */}
      {students.length > 0 && (
        <div className="sticky bottom-4 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between flex-wrap">
            <div className="text-sm text-muted-foreground">
              {selectedIds.length > 0 
                ? `${selectedIds.length} student(s) selected for deletion`
                : 'No students selected'
              }
            </div>
            <Button 
              onClick={handleDeleteClick} 
              disabled={selectedIds.length === 0 || loading}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedIds.length})
            </Button>
          </div>
        </div>
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
                <Button
                  onClick={() => setDialogOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, Delete
                </Button>
              </>
            ) : (
              <Button onClick={() => setDialogOpen(false)}>OK</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
