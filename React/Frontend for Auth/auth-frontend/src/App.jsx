import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { apiFetch } from "./utils/api";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(Boolean(token));

  function handleLoginSuccess(token, userData) {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setPage("login");
  }

  function handleUnauthorized() {
    handleLogout();
  }

  useEffect(() => {
    let ignore = false;

    async function restoreSession() {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await apiFetch(
          "/profile",
          { method: "GET" },
          { onUnauthorized: handleUnauthorized },
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to restore session");
        }

        if (!ignore) {
          setUser(data.user);
          setPage("dashboard");
        }
      } catch (error) {
        if (!ignore) {
          handleLogout();
        }
      } finally {
        if (!ignore) {
          setAuthLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <div style={{ maxWidth: 460, margin: "60px auto", padding: "0 1rem" }}>
      {authLoading && token ? <p>Restoring session...</p> : null}
      {page === "login" && (
        <Login
          onSuccess={handleLoginSuccess}
          onSwitch={() => setPage("register")}
        />
      )}
      {page === "register" && <Register onSwitch={() => setPage("login")} />}
      {page === "dashboard" && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onUnauthorized={handleUnauthorized}
        />
      )}
    </div>
  );
}

export default App;
