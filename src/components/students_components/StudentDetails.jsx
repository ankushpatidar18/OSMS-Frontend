import React from "react";

// Utility functions for masking and validation
const maskAadhaar = (aadhaar) =>
  aadhaar && aadhaar.length === 12
    ? `XXXX-XXXX-${aadhaar.slice(-4)}`
    : aadhaar || "-";

function toDateInputValue(dateString) {
  if (!dateString) return "";
  // If already in YYYY-MM-DD, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  // If ISO string, just take the first 10 chars
  return dateString.slice(0, 10);
}

const isValidAadhaar = (value) => /^\d{12}$/.test(value);
const isValidMobile = (value) => /^[6-9]\d{9}$/.test(value);
const isValidPincode = (value) => /^\d{6}$/.test(value);

const StudentDetails = ({
  student,
  editing,
  editData,
  handleEditChange,
  formatDateForDisplay,
}) => (
  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 bg-gray-50">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {/* Personal Information */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
          Personal Information
        </h4>
        <div className="space-y-2">
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-xs font-medium text-gray-600 mb-1">
              Gender
            </label>
            {editing ? (
              <select
                id="gender"
                value={editData.gender}
                onChange={e => handleEditChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className="text-sm text-gray-800">{student.gender || "-"}</div>
            )}
          </div>
          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-xs font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            {editing ? (
              <input
                id="dob"
                type="date"
                value={toDateInputValue(editData.dob)}
                onChange={e => handleEditChange("dob", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">
                {formatDateForDisplay(student.dob) || "-"}
              </div>
            )}
          </div>
          {/* Aadhaar Number */}
          <div>
            <label htmlFor="aadhaar_number" className="block text-xs font-medium text-gray-600 mb-1">
              Aadhaar Number
            </label>
            {editing ? (
              <>
                <input
                  id="aadhaar_number"
                  type="text"
                  value={editData.aadhaar_number}
                  onChange={e => handleEditChange("aadhaar_number", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="\d{12}"
                  maxLength={12}
                />
                {editData.aadhaar_number && !isValidAadhaar(editData.aadhaar_number) && (
                  <span className="text-xs text-red-600">Enter a valid 12-digit Aadhaar number.</span>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-800 font-mono">
                {maskAadhaar(student.aadhaar_number)}
              </div>
            )}
          </div>
          {/* Height */}
          <div>
            <label htmlFor="height_cm" className="block text-xs font-medium text-gray-600 mb-1">
              Height (cm)
            </label>
            {editing ? (
              <input
                id="height_cm"
                type="number"
                value={editData.height_cm}
                onChange={e => handleEditChange("height_cm", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={30}
                max={250}
              />
            ) : (
              <div className="text-sm text-gray-800">
                {student.height_cm ? `${student.height_cm} cm` : "-"}
              </div>
            )}
          </div>
          {/* Weight */}
          <div>
            <label htmlFor="weight_kg" className="block text-xs font-medium text-gray-600 mb-1">
              Weight (kg)
            </label>
            {editing ? (
              <input
                id="weight_kg"
                type="number"
                value={editData.weight_kg}
                onChange={e => handleEditChange("weight_kg", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={10}
                max={200}
              />
            ) : (
              <div className="text-sm text-gray-800">
                {student.weight_kg ? `${student.weight_kg} kg` : "-"}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Academic Information */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
          Academic Information
        </h4>
        <div className="space-y-2">
          {/* Medium */}
          <div>
            <label htmlFor="medium" className="block text-xs font-medium text-gray-600 mb-1">
              Medium
            </label>
            {editing ? (
              <input
                id="medium"
                type="text"
                value={editData.medium}
                onChange={e => handleEditChange("medium", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">{student.medium || "-"}</div>
            )}
          </div>
          {/* Session */}
          <div>
            <label htmlFor="session" className="block text-xs font-medium text-gray-600 mb-1">
              Session
            </label>
            {editing ? (
              <input
                id="session"
                type="text"
                value={editData.session}
                onChange={e => handleEditChange("session", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">{student.session || "-"}</div>
            )}
          </div>
          {/* SSSMID */}
          <div>
            <label htmlFor="sssmid" className="block text-xs font-medium text-gray-600 mb-1">
              SSSMID
            </label>
            {editing ? (
              <input
                id="sssmid"
                type="text"
                value={editData.sssmid}
                onChange={e => handleEditChange("sssmid", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800 font-mono">{student.sssmid || "-"}</div>
            )}
          </div>
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-gray-600 mb-1">
              Category
            </label>
            {editing ? (
              <input
                id="category"
                type="text"
                value={editData.category}
                onChange={e => handleEditChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                {student.category || "-"}
              </span>
            )}
          </div>
          {/* PEN Number */}
          <div>
            <label htmlFor="pen_number" className="block text-xs font-medium text-gray-600 mb-1">
              PEN Number
            </label>
            {editing ? (
              <input
                id="pen_number"
                type="number"
                value={editData.PEN_Number}
                onChange={e => handleEditChange("PEN_Number", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {student.PEN_Number || "-"}
              </span>
            )}
          </div>
          {/* APAAR Number */}
          <div>
            <label htmlFor="apaar_number" className="block text-xs font-medium text-gray-600 mb-1">
              APAAR Number
            </label>
            {editing ? (
              <input
                id="apaar_number"
                type="number"
                value={editData.APAAR_Number}
                onChange={e => handleEditChange("APAAR_Number", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {student.APAAR_Number || "-"}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Contact & Family Information */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-300 pb-1">
          Contact & Family
        </h4>
        <div className="space-y-2">
          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile_number" className="block text-xs font-medium text-gray-600 mb-1">
              Mobile Number
            </label>
            {editing ? (
              <>
                <input
                  id="mobile_number"
                  type="text"
                  value={editData.mobile_number}
                  onChange={e => handleEditChange("mobile_number", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[6-9]\d{9}"
                  maxLength={10}
                />
                {editData.mobile_number && !isValidMobile(editData.mobile_number) && (
                  <span className="text-xs text-red-600">Enter a valid 10-digit mobile number.</span>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-800 font-mono">
                {student.mobile_number || "-"}
              </div>
            )}
          </div>
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">
              Address
            </label>
            {editing ? (
              <textarea
                id="address"
                value={editData.address}
                onChange={e => handleEditChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">{student.address || "-"}</div>
            )}
          </div>
          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-xs font-medium text-gray-600 mb-1">
              Pincode
            </label>
            {editing ? (
              <>
                <input
                  id="pincode"
                  type="text"
                  value={editData.pincode}
                  onChange={e => handleEditChange("pincode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="\d{6}"
                  maxLength={6}
                />
                {editData.pincode && !isValidPincode(editData.pincode) && (
                  <span className="text-xs text-red-600">Enter a valid 6-digit pincode.</span>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-800 font-mono">{student.pincode || "-"}</div>
            )}
          </div>
          {/* Father's Name */}
          <div>
            <label htmlFor="father_name" className="block text-xs font-medium text-gray-600 mb-1">
              Father's Name
            </label>
            {editing ? (
              <input
                id="father_name"
                type="text"
                value={editData.father_name}
                onChange={e => handleEditChange("father_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">{student.father_name || "-"}</div>
            )}
          </div>
          {/* Mother's Name */}
          <div>
            <label htmlFor="mother_name" className="block text-xs font-medium text-gray-600 mb-1">
              Mother's Name
            </label>
            {editing ? (
              <input
                id="mother_name"
                type="text"
                value={editData.mother_name}
                onChange={e => handleEditChange("mother_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">{student.mother_name || "-"}</div>
            )}
          </div>
          {/* Admission Number */}
          <div>
            <label htmlFor="admission_no" className="block text-xs font-medium text-gray-600 mb-1">
              Admission Number
            </label>
            {editing ? (
              <input
                id="admission_no"
                type="text"
                value={editData.admission_no}
                onChange={e => handleEditChange("admission_no", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800 font-mono">{student.admission_no || "-"}</div>
            )}
          </div>
          {/* Admission Date */}
          <div>
            <label htmlFor="admission_date" className="block text-xs font-medium text-gray-600 mb-1">
              Admission Date
            </label>
            {editing ? (
              <input
                id="admission_date"
                type="date"
                value={toDateInputValue(editData.admission_date)}
                onChange={e => handleEditChange("admission_date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <div className="text-sm text-gray-800">
                {formatDateForDisplay(student.admission_date) || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentDetails;
