import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

interface Props {
  creatorId: number;
  onSuccess: (msg: string) => void;
}

export default function PriceForm({ creatorId, onSuccess }: Props) {
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await invoke("insert_price_command", {
        price: {
          price: parseFloat(price),
          creator_id: creatorId,
          notes: notes || null,
        },
      });
      setPrice("");
      setNotes("");
      onSuccess("✅ Preço cadastrado com sucesso!");
    } catch {
      onSuccess("❌ Erro ao cadastrar preço.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "300px",
      }}
    >
      <label>Preço (R$)</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label>Notas (opcional)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
