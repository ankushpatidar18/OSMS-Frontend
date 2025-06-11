import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClassSelector({ classes, selectedClass, setSelectedClass, isLoading }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class</label>
      {isLoading ? (
        <Skeleton className="h-11 w-full rounded-lg" />
      ) : (
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400">
            <SelectValue placeholder="Select a class" className="text-gray-500" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
            {(classes || []).map((clsObj) => (
              <SelectItem
                key={clsObj.class}
                value={clsObj.class}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              >
                Class {clsObj.class}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
