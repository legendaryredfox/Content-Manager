import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Content Manager</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          🏠 Home
        </Link>
        <Link to="/creator" style={{ textDecoration: "none", color: "black" }}>
          ➕ Cadastrar Creator
        </Link>
        <Link to="/links" style={{ textDecoration: "none", color: "black" }}>
          📄 Links
        </Link>
      </nav>
    </header>
  );
}
