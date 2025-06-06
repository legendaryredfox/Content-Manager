import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Props = {
  onSuccess: () => void;
};

export default function NewLinkForm({ onSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await invoke("insert_link_command", {
        link: {
          url,
          observacoes: observacoes || null,
        },
      });
      setMensagem("✅ Link cadastrado com sucesso!");
      setUrl("");
      setObservacoes("");
      onSuccess();
    } catch (e) {
      setMensagem("❌ Erro ao cadastrar link.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        backgroundColor: "white",
      }}
    >
      <h3
        style={{
          fontSize: "1rem",
          margin: "0 0 0.25rem 0",
          color: "#444",
        }}
      >
        ✨ Adicionar Novo Link
      </h3>

      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://exemplo.com"
        required
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "0.95rem",
        }}
      />

      <textarea
        value={observacoes}
        onChange={(e) => setObservacoes(e.target.value)}
        placeholder="Observações (opcional)"
        rows={4}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "0.95rem",
          resize: "vertical",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          fontSize: "1rem",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "background 0.2s",
          // ":hover": {
          //   background: "#1565c0",
          // },
        }}
      >
        💾 Salvar Link
      </button>

      {mensagem && (
        <p
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            backgroundColor: mensagem.startsWith("✅") ? "#f0fdf4" : "#fee2e2",
            color: mensagem.startsWith("✅") ? "#166534" : "#b91c1c",
            fontSize: "0.9rem",
            margin: 0,
            border: `1px solid ${mensagem.startsWith("✅") ? "#bbf7d0" : "#fecaca"}`,
          }}
        >
          {mensagem}
        </p>
      )}
    </form>
  );
}
