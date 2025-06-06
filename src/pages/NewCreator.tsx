import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function NewCreator() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isUrlFocused, setIsUrlFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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

  const containerStyle = {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box" as const,
  };

  const titleInputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid",
    borderColor: isTitleFocused ? "#3b82f6" : "#e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
    outline: "none",
    boxShadow: isTitleFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
  };

  const urlInputStyle = {
    ...titleInputStyle,
    borderColor: isUrlFocused ? "#3b82f6" : "#e2e8f0",
    boxShadow: isUrlFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: isButtonHovered ? "#2563eb" : "#3b82f6",
    color: "white",
    fontWeight: 600,
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "0.5rem",
    transition: "background-color 0.2s",
    boxSizing: "border-box" as const,
  };

  const messageStyle = {
    marginTop: "1.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: mensagem.startsWith("✅")
      ? "#ecfdf5"
      : mensagem.startsWith("❌")
        ? "#fee2e2"
        : "#eff6ff",
    border: `1px solid ${
      mensagem.startsWith("✅")
        ? "#a7f3d0"
        : mensagem.startsWith("❌")
          ? "#fecaca"
          : "#bfdbfe"
    }`,
    color: mensagem.startsWith("✅")
      ? "#065f46"
      : mensagem.startsWith("❌")
        ? "#b91c1c"
        : "#1e40af",
    fontSize: "0.875rem",
    textAlign: "center" as const,
    width: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={containerStyle}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: "0.5rem",
            }}
          >
            Novo Creator
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Preencha os dados do criador de conteúdo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            width: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <label
              htmlFor="title"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#334155",
              }}
            >
              Título *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ex: Canal de Tecnologia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              required
              style={titleInputStyle}
            />
          </div>

          <div style={{ width: "100%" }}>
            <label
              htmlFor="url"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#334155",
              }}
            >
              URL *
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsUrlFocused(true)}
              onBlur={() => setIsUrlFocused(false)}
              required
              style={urlInputStyle}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Cadastrar Creator
          </button>
        </form>

        {mensagem && <div style={messageStyle}>{mensagem}</div>}
      </div>
    </main>
  );
}

export default NewCreator;
