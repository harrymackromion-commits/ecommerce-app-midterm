import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/auth/Userlog.php",
          {
            credentials: "include", 
          }
        );
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
}
