import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearAdminInfo } from "@/redux/slices/adminSlice"
import mkeplogo from "@/assets/mkeplogo.png"
import axios from "axios"
import { Menu, X, ChevronDown } from "lucide-react"

const ApiUrl = import.meta.env.VITE_BASE_URL

export default function Header() {
  const [showRoles, setShowRoles] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.admin.adminInfo)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoles(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${ApiUrl}/admin/logout`, {}, { withCredentials: true })
      if (res.status === 200) {
        dispatch(clearAdminInfo())
        navigate("/")
      }
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  const closeMobileMenu = () => {
    setShowMobileMenu(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={mkeplogo || "/placeholder.svg"}
              alt="Matra Kripa Education Point Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
            />
            {/* Hide text on mobile, show on sm and up */}
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-blue-800">Matra Kripa Education Point</h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <a href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              About
            </a>
            <a href="/#admission" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Admission
            </a>
            <a href="/#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Facility
            </a>
            
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 relative" ref={dropdownRef}>
            {/* Show Contact button only if not admin, otherwise show Dashboard */}
            {!admin ? (
              <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors duration-200">
                Contact
              </Button>
            ) : (
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="hover:bg-gray-50 transition-colors duration-200">
                  Dashboard
                </Button>
              </Link>
            )}

            {!admin ? (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
                aria-haspopup="menu"
                aria-expanded={showRoles}
                aria-controls="roles-dropdown"
                onClick={() => setShowRoles((prev) => !prev)}
              >
                Login
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showRoles ? "rotate-180" : ""}`} />
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            {/* Login Dropdown */}
            {showRoles && (
              <div
                id="roles-dropdown"
                role="menu"
                aria-label="Login as"
                className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded-lg p-2 space-y-1 z-50 min-w-[120px] animate-in slide-in-from-top-2 duration-200"
              >
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  role="menuitem"
                  onClick={() => {
                    navigate("/admin/login")
                    setShowRoles(false)
                  }}
                >
                  Admin
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start opacity-50 cursor-not-allowed"
                  role="menuitem"
                  disabled
                >
                  Teacher
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start opacity-50 cursor-not-allowed"
                  role="menuitem"
                  disabled
                >
                  Student
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-200 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  to="/#home"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <a
                  href="/#about"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  About
                </a>
                <a
                  href="/#admission"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Admission
                </a>
                <a
                  href="/#features"
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Facility
                </a>
                  
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                {/* Show Contact button only if not admin, otherwise show Dashboard */}
                {!admin ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center hover:bg-gray-50 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </Button>
                ) : (
                  <Link to="/admin/dashboard" className="block" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      className="w-full justify-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}

                {!admin ? (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-500 px-3">Login as:</div>
                    <Button
                      variant="outline"
                      className="w-full justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => {
                        navigate("/admin/login")
                        closeMobileMenu()
                      }}
                    >
                      Admin
                    </Button>
                    <Button variant="outline" className="w-full justify-center opacity-50 cursor-not-allowed" disabled>
                      Teacher (Coming Soon)
                    </Button>
                    <Button variant="outline" className="w-full justify-center opacity-50 cursor-not-allowed" disabled>
                      Student (Coming Soon)
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full justify-center bg-red-600 hover:bg-red-700 transition-colors duration-200"
                    onClick={() => {
                      handleLogout()
                      closeMobileMenu()
                    }}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
