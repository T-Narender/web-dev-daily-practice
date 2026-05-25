function Loader() {
  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <div className="spinner" style={{
        width: 40,
        height: 40,
        border: "4px solid #ddd", 
        borderTop: "4px solid #333",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

}

export default Loader