export default function MarksTable({ marksData, handleMarkChange, isLoading }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {(marksData || []).map(item => (
          <tr key={item.student_id}>
            <td>{item.name}</td>
            <td>
              <input
                type="number"
                min="0"
                value={item.marks_obtained}
                disabled={isLoading}
                onChange={e => handleMarkChange(item.student_id, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
