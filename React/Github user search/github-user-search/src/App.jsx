import { useState } from "react";
import SearchBar from "./components/SerachBar";
import UserCard from "./components/UserCard";
import Loader from "./components/Loader";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchUser(name) {
    //reset state
    setError("");
    setUser(null);
    setLoading(true);

    try {
      const res = await fetch(process.env.Github_url); 

      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", padding: "0 1rem" }}>
      <h2>GitHub User Search</h2>
      <SearchBar onSearch={searchUser} />
      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <UserCard user={user} />}
    </div>
  );
}

export default App;
