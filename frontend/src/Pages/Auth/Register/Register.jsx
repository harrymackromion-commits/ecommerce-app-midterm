import { useState } from "react";
import { Link } from "react-router-dom";
import useRedirect from "../../../Hook/useRedirect";

export default function Register() {
  const { redirect } = useRedirect();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[A-Za-z]{3,}$/;
    if (!usernameRegex.test(form.username)) {
      setMessage("Username must be at least 3 letters with no numbers or special characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setMessage(
        "Password must be at least 8 characters long and include at least 1 letter and 1 number."
      );
      return;
    }


    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Redirecting...");
        redirect("/auth/login", 2000);
      } else {
        setMessage(data.error || "Registration failed. Try another email.");
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="card shadow-lg rounded-4 p-4 w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="text-center mb-4">
          <h2 className="h4 fw-bold text-success mb-2">Register</h2>
          <p className="text-muted small mb-0">
            Create your account to get started.
          </p>
        </div>

        <form className="d-flex flex-column gap-3" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <button type="submit" className="btn btn-success fw-semibold">
            Register
          </button>
        </form>

        {message && <p className="mt-3 text-center text-muted">{message}</p>}

        <div className="mt-3 text-center small text-muted">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-success text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
