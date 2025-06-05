import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import CreatorList from "./components/CreatorList";
import CreatorDetails from "./components/CreatorDetails";

export type Creator = {
  id: number;
  title: string;
  url: string;
};

export type PriceHistory = {
  id: number;
  date: string;
  price: number;
  creator_id: number;
  notes?: string | null;
};

export default function App() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  async function fetchCreators() {
    const lista: Creator[] = await invoke("get_creators_command");
    lista.sort((a, b) => a.id - b.id);
    setCreators(lista);
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  const onCreatorDelete = () => {
    fetchCreators();
    setSelectedCreator(null);
  };
  return (
    <>
      <main
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <CreatorList
          creators={creators}
          selectedId={selectedCreator?.id || null}
          onSelect={setSelectedCreator}
        />
        <section style={{ flex: 1, padding: "2rem" }}>
          {selectedCreator ? (
            <CreatorDetails
              creator={selectedCreator}
              onDelete={() => onCreatorDelete()}
            />
          ) : (
            <p>Selecione um creator para ver detalhes.</p>
          )}
        </section>
      </main>
    </>
  );
}
