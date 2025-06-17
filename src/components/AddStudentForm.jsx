import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';

const classOptions = ['KG1', 'KG2', '1', '2', '3', '4', '5', '6', '7', '8'];
const genderOptions = ['Male', 'Female'];
const categoryOptions = ['GENERAL', 'OBC', 'SC', 'ST'];
const mediumOptions = ['Hindi', 'English'];
const isRepeaterOptions = ['Yes', 'No'];
const sessionOptions = Array.from({ length: 11 }, (_, i) => `${2023 + i}-${2024 + i}`);

export default function AddStudentForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/students/full-register',
        formData,
        { withCredentials: true }
      );
      alert('Student registered successfully');
      setFormData({});
    } catch (err) {
      alert('Error registering student');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Student Details */}
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">Student Details</h2>
          <Input placeholder="Name" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} />

          <Select onValueChange={value => handleChange('gender', value)}>
            <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
            <SelectContent>
              {genderOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <span>DOB</span><Input type="date" value={formData.dob || ''} onChange={e => handleChange('dob', e.target.value)} />
          <Input placeholder="Aadhaar Number" value={formData.aadhaar_number || ''} onChange={e => handleChange('aadhaar_number', e.target.value)} />
          <Input placeholder="Mobile Number" value={formData.mobile_number || ''} onChange={e => handleChange('mobile_number', e.target.value)} />
          <Textarea placeholder="Address" value={formData.address || ''} onChange={e => handleChange('address', e.target.value)} />
          <Input placeholder="Pincode" value={formData.pincode || ''} onChange={e => handleChange('pincode', e.target.value)} />
          <Input placeholder="SSSMID" value={formData.sssmid || ''} onChange={e => handleChange('sssmid', e.target.value)} />

          <Select onValueChange={value => handleChange('class', value)}>
            <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
            <SelectContent>
              {classOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select onValueChange={value => handleChange('medium', value)}>
            <SelectTrigger><SelectValue placeholder="Select Medium" /></SelectTrigger>
            <SelectContent>
              {mediumOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select onValueChange={value => handleChange('session', value)}>
            <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
            <SelectContent>
              {sessionOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select onValueChange={value => handleChange('is_repeater', value === 'Yes')}>
            <SelectTrigger><SelectValue placeholder="Is Repeater?" /></SelectTrigger>
            <SelectContent>
              {isRepeaterOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input type="number" placeholder="Roll Number" value={formData.roll_number || ''} onChange={e => handleChange('roll_number', e.target.value)} />
        </CardContent>
      </Card>

      {/* Parent Details */}
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">Parent Details</h2>
          <Input placeholder="Father's Name" value={formData.father_name || ''} onChange={e => handleChange('father_name', e.target.value)} />
          <Input placeholder="Mother's Name" value={formData.mother_name || ''} onChange={e => handleChange('mother_name', e.target.value)} />
        </CardContent>
      </Card>

      {/* Admission Details */}
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">Admission Details</h2>
          <Input placeholder="Admission Number" value={formData.admission_no || ''} onChange={e => handleChange('admission_no', e.target.value)} />
          <Input type="date" value={formData.admission_date || ''} onChange={e => handleChange('admission_date', e.target.value)} />
        </CardContent>
      </Card>

      {/* Physical Info */}
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">Physical Information</h2>
          <Input placeholder="Height (cm)" value={formData.height_cm || ''} onChange={e => handleChange('height_cm', e.target.value)} />
          <Input placeholder="Weight (kg)" value={formData.weight_kg || ''} onChange={e => handleChange('weight_kg', e.target.value)} />
        </CardContent>
      </Card>

      {/* Social Info */}
      <Card>
        <CardContent className="grid gap-4 p-4">
          <h2 className="text-xl font-semibold">Social Information</h2>
          <Select onValueChange={value => handleChange('category', value)}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              {categoryOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

