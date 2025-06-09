export default function ClassSelector({ classes, selectedClass, setSelectedClass, isLoading }) {
  return (
    <div className="mb-4">
      <label>Select Class</label>
      <select
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
        disabled={isLoading}
      >
        <option value="">Select a class</option>
        {(classes || []).map(clsObj => (
  <option key={clsObj.class} value={clsObj.class}>{clsObj.class}</option>
))}

      </select>
    </div>
  );
}
