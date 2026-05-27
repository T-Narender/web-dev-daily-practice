function Dashboard({ user, onLogout }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h2>Welcome back 👋</h2>
      {user ? (
        <p>
          Logged in as <strong>{user.name}</strong> ({user.email})
        </p>
      ) : (
        <p>You are logged in.</p>
      )}
      <button
        onClick={onLogout}
        style={{ marginTop: "1rem", padding: "8px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
