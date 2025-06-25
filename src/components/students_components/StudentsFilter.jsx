import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, RotateCcw, Download } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader as DialogHead,
  DialogTitle as DialogHeadTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 

const StudentsFilter = ({
  filters,
  handleFilterChange,
  sessionOptions,
  classOptions,
  handleSearch,
  clearFilters,
  exportToPDF,
  students,
}) => {
  const [showClearDialog, setShowClearDialog] = useState(false);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Search & Filter Students
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="session" className="block text-sm font-semibold text-gray-700">
              Session <span className="text-red-500">*</span>
            </label>
            <select
              id="session"
              value={filters.session}
              onChange={e => handleFilterChange("session", e.target.value)}
              className="px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              required
            >
              <option value="">Select Session</option>
              {sessionOptions.map(session => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700">
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              value={filters.name}
              onChange={e => handleFilterChange("name", e.target.value)}
              placeholder="Search by name..."
              className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              disabled={!filters.session}
            />
          </div>
          <div>
            <label htmlFor="class" className="block text-sm font-semibold text-gray-700">
              Class
            </label>
            <select
              id="class"
              value={filters.class}
              onChange={e => handleFilterChange("class", e.target.value)}
              className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              disabled={!filters.session}
            >
              <option value="">All Classes</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="admissionNo" className="block text-sm font-semibold text-gray-700">
              Admission Number
            </label>
            <input
              id="admissionNo"
              type="text"
              value={filters.admission_no}
              onChange={e => handleFilterChange("admission_no", e.target.value)}
              placeholder="Search by admission number..."
              className="w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              disabled={!filters.session}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
          <Button
            onClick={handleSearch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            disabled={!filters.session}
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
          {/* Clear Filters with Confirmation Dialog */}
          <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                type="button"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHead>
                <DialogHeadTitle>Clear all filters?</DialogHeadTitle>
                <DialogDescription>
                  Are you sure you want to reset all filters? This action cannot be undone.
                </DialogDescription>
              </DialogHead>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowClearDialog(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    setShowClearDialog(false);
                    clearFilters();
                  }}
                  type="button"
                >
                  Clear Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            onClick={exportToPDF}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            disabled={students.length === 0}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsFilter;
