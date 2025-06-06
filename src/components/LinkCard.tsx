import { useState } from "react";

type Link = {
  id: number;
  url: string;
  observacoes?: string | null;
  visitado: boolean;
};

type Props = {
  link: Link;
  onToggle: (id: number) => void;
};

export default function LinkCard({ link, onToggle }: Props) {
  const [copiado, setCopiado] = useState(false);

  function copiarParaClipboard() {
    navigator.clipboard.writeText(link.url).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    });
  }

  return (
    <div
      style={{
        position: "relative",
        padding: "1.25rem",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: link.visitado ? "#f0fdf4" : "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        // ":hover": {
        //   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        // },
      }}
    >
      <div style={{ marginBottom: "0.75rem" }}>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#1a73e8",
            textDecoration: "none",
            fontWeight: "500",
            wordBreak: "break-all",
            display: "inline-block",
            marginBottom: "0.5rem",
          }}
        >
          {link.url}
        </a>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {/* Botão de toggle que também mostra o status */}
          <button
            onClick={() => onToggle(link.id)}
            style={{
              padding: "0.3rem 0.6rem",
              borderRadius: "6px",
              backgroundColor: link.visitado ? "#dcfce7" : "#f3f4f6",
              border: "1px solid #ddd",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              cursor: "pointer",
              transition: "all 0.2s",
              // ":hover": {
              //   backgroundColor: link.visitado ? "#bbf7d0" : "#e5e7eb",
              // },
            }}
          >
            {link.visitado ? "✅ Visitado" : "❌ Não visitado"}
          </button>

          <button
            onClick={copiarParaClipboard}
            style={{
              backgroundColor: "#e0f2fe",
              border: "1px solid #7dd3fc",
              color: "#0369a1",
              borderRadius: "6px",
              padding: "0.3rem 0.6rem",
              fontSize: "0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "all 0.2s",
              // ":hover": {
              //   backgroundColor: "#bae6fd"
              // }
            }}
          >
            📋 Copiar
          </button>

          {copiado && (
            <span
              style={{
                color: "#0369a1",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              Copiado!
            </span>
          )}
        </div>
      </div>

      {link.observacoes && (
        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "#f8fafc",
            borderRadius: "6px",
            borderLeft: "3px solid #7dd3fc",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#334155",
              fontSize: "0.9rem",
              lineHeight: "1.4",
            }}
          >
            {link.observacoes}
          </p>
        </div>
      )}
    </div>
  );
}
