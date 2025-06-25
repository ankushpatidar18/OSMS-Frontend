import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClassSelector({ classes, selectedClass, setSelectedClass, isLoading }) {
  const hasClasses = classes && classes.length > 0;

  return (
    <div className="space-y-3">
      <label htmlFor="class-selector" className="block text-sm font-semibold text-gray-700 mb-2">
        Select Class
      </label>
      <Select
        value={selectedClass}
        onValueChange={setSelectedClass}
        disabled={isLoading || !hasClasses}
      >
        <SelectTrigger
          id="class-selector"
          className="w-full h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
          aria-busy={isLoading}
          aria-describedby={!hasClasses ? "no-classes-msg" : undefined}
        >
          <SelectValue
            placeholder={isLoading ? "Loading classes..." : "Select a class"}
            className="text-gray-500"
          />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : hasClasses ? (
            classes.map((clsObj) => (
              <SelectItem
                key={clsObj.class}
                value={clsObj.class}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
              >
                Class {clsObj.class}
              </SelectItem>
            ))
          ) : (
            <div id="no-classes-msg" className="px-4 py-2 text-gray-500">
              No classes available
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
