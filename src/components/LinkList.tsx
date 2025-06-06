import LinkCard from "./LinkCard";

type Link = {
  id: number;
  url: string;
  observacoes?: string | null;
  visitado: boolean;
};

type Props = {
  links: Link[];
  onToggle: (id: number) => void;
};

export default function LinkList({ links, onToggle }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        marginBottom: "5rem",
      }}
    >
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onToggle={onToggle} />
      ))}
    </div>
  );
}
