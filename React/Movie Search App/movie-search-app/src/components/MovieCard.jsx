function MovieCard({ movie }) {
  const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/160x240?text=No+Image"

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden", textAlign: "center" }}>
      <img
        src={poster}
        alt={movie.Title}
        style={{ width: "100%", height: 240, objectFit: "cover" }}
      />
      <div style={{ padding: "8px" }}>
        <p style={{ fontWeight: "bold", fontSize: 13, margin: "4px 0" }}>
          {movie.Title}
        </p>
        <p style={{ fontSize: 12, color: "#888" }}>
          {movie.Year}
        </p>
      </div>
    </div>
  )
}

export default MovieCard