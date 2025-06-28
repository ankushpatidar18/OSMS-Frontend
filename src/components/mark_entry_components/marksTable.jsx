import { Input } from "@/components/ui/input";

export default function MarksTable({ marksData, handleMarkChange, isLoading }) {
  if (isLoading) {
    return <div>Loading marks table...</div>;
  }

  if (!marksData || marksData.length === 0) {
    return <div className="text-gray-500">No students found for this class/session.</div>;
  }

  function formatDOB(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <table className="min-w-full border mt-4" aria-label="Marks Entry Table">
      <thead>
        <tr>
          <th className="border px-4 py-2">Student ID</th>
          <th className="border px-4 py-2">Name (DOB)</th>
          <th className="border px-4 py-2">Marks Obtained</th>
        </tr>
      </thead>
      <tbody>
        {marksData.map((row) => (
          <tr key={row.student_id}>
            <td className="border px-4 py-2">{row.student_id}</td>
            <td className="border px-4 py-2">
              {row.name} ({formatDOB(row.dob)})
            </td>
            <td className="border px-4 py-2">
              <Input
                // type="number"
                value={row.marks_obtained ?? ""}
                onChange={(e) => handleMarkChange(row.student_id, e.target.value)}
                className="w-24 px-2 py-1 border rounded"
                // min="0"
                aria-label={`Enter marks for ${row.name}`}
                placeholder="Marks"
                // inputMode="numeric"
                // pattern="[0-9]*"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
