import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminInfo } from "@/redux/slices/adminSlice";
import mkeplogo from "@/assets/mkeplogo.png";
import axios from "axios";

const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function Header() {
  const [showRoles, setShowRoles] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.adminInfo);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoles(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${ApiUrl}/admin/logout`, {}, { withCredentials: true });
      if (res.status === 200) {
        dispatch(clearAdminInfo());
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <img
              src={mkeplogo}
              alt="Matra Kripa Education Point Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-bold text-blue-800">
                Matra Kripa Education Point
              </h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {/* Use <a> for anchor links to sections, <Link> for route navigation */}
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <a href="/#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="/#admission" className="text-gray-700 hover:text-blue-600">Admission</a>
            <a href="/#facilities" className="text-gray-700 hover:text-blue-600">Facilities</a>
            {!admin ? (
              <a href="/#academics" className="text-gray-700 hover:text-blue-600">Academics</a>
            ) : (
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
            <Button variant="outline" size="sm">Contact</Button>
            {!admin ? (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                aria-haspopup="menu"
                aria-expanded={showRoles}
                aria-controls="roles-dropdown"
                onClick={() => setShowRoles((prev) => !prev)}
              >
                Login
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            {showRoles && (
              <div
                id="roles-dropdown"
                role="menu"
                aria-label="Login as"
                className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded-md p-2 space-y-2 z-50"
              >
                <Button
                  variant="outline"
                  className="w-full text-left"
                  role="menuitem"
                  onClick={() => {
                    navigate("/admin/login");
                    setShowRoles(false);
                  }}
                >
                  Admin
                </Button>
                <Button variant="outline" className="w-full text-left" role="menuitem" disabled>
                  Teacher
                </Button>
                <Button variant="outline" className="w-full text-left" role="menuitem" disabled>
                  Student
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
