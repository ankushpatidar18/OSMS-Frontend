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
import { Users, GraduationCap, Calendar, ArrowUpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ApiUrl = import.meta.env.VITE_BASE_URL;
const sessions = Array.from({ length: 11 }, (_, i) => {
  const start = 2023 + i;
  return `${start}-${start + 1}`;
});
const classes = ['KG1', 'KG2', '1', '2', '3', '4', '5', '6', '7', '8'];

export default function PromoteStudents() {
  const [session, setSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Promotion target
  const [nextSession, setNextSession] = useState('');
  const [nextClass, setNextClass] = useState('');

  // Dialog state for feedback and confirmation
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogType, setDialogType] = useState('info'); // 'info', 'confirm', 'success', 'error'
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (session && selectedClass) {
      setLoading(true);
      axios
        .get(
          `${ApiUrl}/students/delete/filter?session=${session}&class=${selectedClass}`,
          { withCredentials: true }
        )
        .then((res) => {
          setStudents(Array.isArray(res.data) ? res.data : []);
          setSelectedIds([]);
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

  // Open confirmation dialog
  const handlePromoteClick = () => {
    if (selectedIds.length === 0) {
      setDialogMsg('No students selected.');
      setDialogType('info');
      setDialogOpen(true);
      return;
    }
    if (!nextSession || !nextClass) {
      setDialogMsg('Please select next session and class.');
      setDialogType('info');
      setDialogOpen(true);
      return;
    }
    setDialogMsg(`Are you sure you want to promote ${selectedIds.length} student(s) to ${nextClass} (${nextSession})?`);
    setDialogType('confirm');
    setPendingAction(() => promoteSelected);
    setDialogOpen(true);
  };

  // Actual promotion logic
  const promoteSelected = async () => {
    setDialogOpen(false);
    setLoading(true);
    try {
      await axios.post(
        `${ApiUrl}/students/promote`,
        {
          fromSession: session,
          fromClass: selectedClass,
          toSession: nextSession,
          toClass: nextClass,
          studentIds: selectedIds
        },
        { withCredentials: true }
      );
      setDialogMsg('Selected students promoted successfully.');
      setDialogType('success');
      setDialogOpen(true);
      setSelectedIds([]);
      // Refresh students list
      setLoading(true);
      axios
        .get(
          `${ApiUrl}/students/delete/filter?session=${session}&class=${selectedClass}`,
          { withCredentials: true }
        )
        .then((res) => setStudents(Array.isArray(res.data) ? res.data : []))
        .catch(() => setStudents([]))
        .finally(() => setLoading(false));
    } catch (err) {
      setDialogMsg('Failed to promote students: ' + (err.response?.data?.error || err.message));
      setDialogType('error');
      setDialogOpen(true);
    } finally {
      setLoading(false);
      setPendingAction(null);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5" />
            Promote Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-2">Select Current Session</label>
              <Select onValueChange={setSession} value={session}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose session..." />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="font-medium block mb-2">Select Current Class</label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose class..." />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>Class {c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotion Target Section */}
      {(session && selectedClass) && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium block mb-2">Next Session</label>
                <Select onValueChange={setNextSession} value={nextSession}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose next session..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-medium block mb-2">Next Class</label>
                <Select onValueChange={setNextClass} value={nextClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose next class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c} value={c}>Class {c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {selectedIds.length} of {students.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                    className="text-xs"
                    aria-label={selectedIds.length === students.length ? 'Deselect all students' : 'Select all students'}
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
                <div className="p-8 text-center text-muted-foreground" aria-live="polite">
                  Loading students...
                </div>
              ) : Array.isArray(students) && students.length > 0 ? (
                <div className="divide-y">
                  {students.map((student, index) => (
                    <div
                      key={student.student_id}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        selectedIds.includes(student.student_id) ? 'bg-green-50 border-l-4 border-l-green-400' : ''
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
                        aria-label={`Select ${student.name}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center" aria-live="polite">
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

      {/* Promote Button */}
      {students.length > 0 && (
        <div className="sticky bottom-4 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between flex-wrap">
            <div className="text-sm text-muted-foreground" aria-live="polite">
              {selectedIds.length > 0 
                ? `${selectedIds.length} student(s) selected for promotion`
                : 'No students selected'
              }
            </div>
            <Button 
              onClick={handlePromoteClick} 
              disabled={selectedIds.length === 0 || !nextSession || !nextClass || loading}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label="Promote selected students"
            >
              <ArrowUpCircle className="w-4 h-4" />
              {loading ? "Promoting..." : `Promote Selected (${selectedIds.length})`}
            </Button>
          </div>
        </div>
      )}

      {/* Dialog for feedback and confirmation */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'confirm'
                ? 'Confirm Promotion'
                : dialogType === 'success'
                ? 'Success'
                : dialogType === 'error'
                ? 'Error'
                : 'Info'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4" aria-live="polite">{dialogMsg}</div>
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
                  onClick={pendingAction}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Yes, Promote
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
