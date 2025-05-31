import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminInfo } from "@/redux/slices/adminSlice";

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      //have to put url into .env file
      const res = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include", // important to send cookies
      });

      if (res.ok) {
        dispatch(clearAdminInfo());
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=50&h=50&fit=crop&crop=center"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-blue-800">
                Matra Kripa Education Point
              </h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#admission" className="text-gray-700 hover:text-blue-600">Admission</a>
            <a href="#academics" className="text-gray-700 hover:text-blue-600">Academics</a>
            <a href="#facilities" className="text-gray-700 hover:text-blue-600">Facilities</a>
          </div>

          <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
            <Button variant="outline" size="sm">Contact</Button>

            {!admin ? (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowRoles(!showRoles)}
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
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded-md p-2 space-y-2 z-50">
                <Button
                  variant="outline"
                  className="w-full text-left"
                  onClick={() => {
                    navigate("/admin/login");
                    setShowRoles(false);
                  }}
                >
                  Admin
                </Button>
                <Button variant="outline" className="w-full text-left">Teacher</Button>
                <Button variant="outline" className="w-full text-left">Student</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
