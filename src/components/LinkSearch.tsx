import { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";

type LinkResult = {
  id: number;
  url: string;
  observacoes?: string | null;
  visitado: boolean;
};

export default function LinkSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<LinkResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQueried = useRef<string>("");

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed && trimmed !== lastQueried.current) {
        lastQueried.current = trimmed;
        invoke<LinkResult>("link_query_command", { url: trimmed })
          .then((res) => setResult(res))
          .catch(() => setResult(null));
      } else if (!trimmed) {
        setResult(null);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column" }}>
      <h3
        style={{
          fontSize: "1rem",
          margin: "0 0 0.75rem 0",
          color: "#444",
        }}
      >
        🔍 Buscar Link Existente
      </h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cole a URL para buscar..."
        style={{
          width: "inherit",
          padding: "0.75rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "0.95rem",
          marginBottom: "0.5rem",
        }}
      />
      {result && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginTop: "0.5rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ display: "block", marginBottom: "0.25rem" }}>
              URL:
            </strong>
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1a73e8", wordBreak: "break-all" }}
            >
              {result.url}
            </a>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ display: "block", marginBottom: "0.25rem" }}>
              Status:
            </strong>
            <span>{result.visitado ? "✅ Visitado" : "❌ Não visitado"}</span>
          </div>
          <div>
            <strong style={{ display: "block", marginBottom: "0.25rem" }}>
              Observações:
            </strong>
            <span>{result.observacoes || "Nenhuma observação"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
