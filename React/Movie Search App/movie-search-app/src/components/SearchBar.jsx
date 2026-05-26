function SearchBar({ query, onChange }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies..."
      style={{ width: "100%", padding: "10px", fontSize: "16px", boxSizing: "border-box" }}
    />
  )
}

export default SearchBar