import { useState } from "react";
import { Link } from "react-router-dom";
import useRedirect from "../../../Hook/useRedirect";

export default function Login() {
  const { redirect } = useRedirect();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [focused,setFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Redirecting...");
        redirect("/dashboard", 2000); 
      } else {
        setMessage(data.error || "Login failed");
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
          <h2 className="h4 fw-bold text-success mb-2">Login</h2>
        </div>

        <form className="d-flex flex-column gap-3" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ borderColor: focused ? "green" : "#ced4da" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ borderColor: focused ? "green" : "#ced4da" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <button type="submit" className="btn btn-success fw-semibold">
            Login
          </button>
        </form>

        {message && <p className="mt-3 text-center text-success">{message}</p>}

        <div className="mt-3 text-center small text-muted">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-success text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
