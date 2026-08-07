import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side password confirmation check
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Register to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Name"
          name="name"
          type="text"
          icon={<User size={20} />}
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          icon={<Mail size={20} />}
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          icon={<Lock size={20} />}
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={<Lock size={20} />}
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="text-center text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;