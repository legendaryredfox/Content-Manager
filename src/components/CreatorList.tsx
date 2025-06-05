import { Creator } from "../App";

interface Props {
  creators: Creator[];
  selectedId: number | null;
  onSelect: (c: Creator) => void;
}

export default function CreatorList({ creators, selectedId, onSelect }: Props) {
  return (
    <aside
      style={{
        width: "300px",
        borderRight: "1px solid #ccc",
        padding: "1rem",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <h2>Creators</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {creators.map((creator) => (
          <li
            key={creator.id}
            onClick={() => onSelect(creator)}
            style={{
              padding: "0.75rem",
              marginBottom: "0.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor:
                selectedId === creator.id ? "#e0f2fe" : "#f1f1f1",
            }}
          >
            {creator.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
