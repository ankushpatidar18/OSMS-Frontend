import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and School Name */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=50&h=50&fit=crop&crop=center"
                alt="Matra Kripa Education Point Logo"
                className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-800">Matra Kripa Education Point</h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#admission" className="text-gray-700 hover:text-blue-600 transition-colors">
              Admission
            </a>
            <a href="#academics" className="text-gray-700 hover:text-blue-600 transition-colors">
              Academics
            </a>
            <a href="#facilities" className="text-gray-700 hover:text-blue-600 transition-colors">
              Facilities
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Contact
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
