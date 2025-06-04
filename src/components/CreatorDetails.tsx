import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PriceForm from "./PriceForm";
import PriceChart from "./PriceChart";
import type { Creator, PriceHistory } from "../types";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  creator: Creator;
  onDelete: () => void;
};

export default function CreatorDetails({ creator, onDelete }: Props) {
  const [prices, setPrices] = useState<PriceHistory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function fetchPrices() {
    try {
      const data: PriceHistory[] = await invoke(
        "get_prices_by_creator_id_command",
        {
          creatorId: creator.id,
        },
      );
      setPrices(data);
    } catch (e) {
      console.error("Erro ao buscar preços:", e);
      setPrices([]);
    }
  }

  useEffect(() => {
    fetchPrices();
    setShowForm(false);
    setShowConfirm(false);
  }, [creator]);

  async function handleDelete() {
    try {
      await invoke("delete_creator_command", { id: creator.id });
      onDelete();
    } catch (e) {
      alert("❌ Erro ao deletar criador.");
    } finally {
      setShowConfirm(false);
    }
  }

  return (
    <section style={{ flex: 1, padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Dados do criador + botões */}
        <div style={{ flex: 1, maxWidth: "50%" }}>
          <h2>{creator.title}</h2>
          <p>
            <a
              href={creator.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "black", textDecoration: "none" }}
            >
              🔗 {creator.url}
            </a>
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? "❌ Cancelar" : "➕ Cadastrar Preço"}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                color: "red",
                border: "1px solid red",
                padding: "0.3rem 0.75rem",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              🗑️ Deletar criador
            </button>
          </div>
        </div>

        {/* Formulário mais próximo */}
        {showForm && (
          <div style={{ minWidth: "300px", marginTop: "0.25rem" }}>
            <PriceForm
              creatorId={creator.id}
              onSuccess={() => {
                fetchPrices();
                setShowForm(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {showConfirm && (
        <ConfirmDialog
          message={`Tem certeza que deseja excluir o criador "${creator.title}"? Isso removerá todos os dados relacionados.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Gráfico abaixo */}
      <h3 style={{ marginTop: "2rem" }}>Histórico de Preços</h3>
      <PriceChart data={prices} />
    </section>
  );
}
