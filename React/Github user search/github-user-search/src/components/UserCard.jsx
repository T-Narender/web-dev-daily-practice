function UserCard({ user }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", marginTop: "1rem" }}>
      <img
        src={user.avatar_url}
        alt="avatar"
        width={80}
        style={{ borderRadius: "50%" }}
      />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <p>📦 Public Repos: {user.public_repos}</p>
      <p>👥 Followers: {user.followers}</p>
      <p>🔗 <a href={user.html_url} target="_blank">View Profile</a></p>
    </div>
  )
}

export default UserCard