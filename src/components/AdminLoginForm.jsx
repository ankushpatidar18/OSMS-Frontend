import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "@/redux/slices/adminSlice";
import axios from "axios";
const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${ApiUrl}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      const data = res.data;

      dispatch(setAdminInfo(data.admin));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed" + (err.message ? `: ${err.message}` : "")
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Admin Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between items-center">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => alert("Redirect to Forgot Password")}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}
