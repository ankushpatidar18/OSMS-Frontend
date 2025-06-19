import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sessions = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
  "2027-2028",
  "2028-2029",
  "2029-2030",
  "2030-2031",
  "2031-2032",
  "2032-2033",
  "2033-2034",
];

export default function SessionSelector({ selectedSession, setSelectedSession, isLoading }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Session</label>
      <Select value={selectedSession} onValueChange={setSelectedSession} disabled={isLoading}>
        <SelectTrigger className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400">
          <SelectValue placeholder="Select a session" className="text-gray-500" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          {sessions.map((session) => (
            <SelectItem
              key={session}
              value={session}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
            >
              {session}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}