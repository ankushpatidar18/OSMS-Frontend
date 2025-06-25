import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "@/redux/slices/adminSlice";
import axios from "axios";
const ApiUrl = import.meta.env.VITE_BASE_URL;

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Admin Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

        <div className="flex justify-between items-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setForgotOpen(true)}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm text-gray-700">
            Please contact the school administrator to reset your password.
          </div>
          <DialogFooter>
            <Button onClick={() => setForgotOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
