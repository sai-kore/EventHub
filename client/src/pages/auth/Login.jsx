import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      setUser(data.user);

      toast.success("Welcome back!");
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          icon={<Mail size={20} />}
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <Input
          label="Password"
          type="password"
          icon={<Lock size={20} />}
          placeholder="Enter your password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p className="text-center text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;