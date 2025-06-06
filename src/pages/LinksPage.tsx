import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import NewLinkForm from "../components/NewLinkForm";
import LinkList from "../components/LinkList";
import LinkSearch from "../components/LinkSearch";

type Link = {
  id: number;
  url: string;
  observacoes?: string | null;
  visitado: boolean;
};

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [showForm, setShowForm] = useState(true);

  async function fetchLinks() {
    const data: Link[] = await invoke("get_links_command");
    setLinks(data);
  }

  async function toggleVisitado(id: number) {
    await invoke("toggle_visitado_command", { id });
    fetchLinks();
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {showForm && (
        <aside
          style={{
            width: "350px",
            padding: "1.5rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Adicionar Link</h2>
            <button
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: "transparent",
                color: "#666",
                padding: "0.3rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              ❌ Esconder
            </button>
          </div>

          <LinkSearch />
          <NewLinkForm onSuccess={fetchLinks} />
        </aside>
      )}

      <section
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem",
          boxSizing: "border-box",
          backgroundColor: "white",
        }}
      >
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ➕ Mostrar Formulário
          </button>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", margin: 0 }}>🔗 Links Salvos</h2>
          <span
            style={{
              backgroundColor: "#e0e0e0",
              padding: "0.25rem 0.5rem",
              borderRadius: "10px",
              fontSize: "0.9rem",
            }}
          >
            {links.length} itens
          </span>
        </div>

        <LinkList links={links} onToggle={toggleVisitado} />
      </section>
    </main>
  );
}
