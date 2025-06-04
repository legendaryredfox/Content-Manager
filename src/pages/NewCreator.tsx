import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function NewCreator() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("Enviando...");
    try {
      await invoke("new_creator_command", {
        creator: { title, url },
      });
      setMensagem("✅ Criador cadastrado com sucesso!");
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao cadastrar criador.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Cadastro de Creator
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              fontSize: "1rem",
            }}
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: 600,
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Salvar
          </button>
        </form>

        {mensagem && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: mensagem.startsWith("✅")
                ? "#059669"
                : mensagem.startsWith("❌")
                  ? "#dc2626"
                  : "#4b5563",
            }}
          >
            {mensagem}
          </p>
        )}
      </div>
    </main>
  );
}

export default NewCreator;
