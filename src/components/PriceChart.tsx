import { AxisDomain } from "recharts/types/util/types";
import { PriceHistory } from "../App";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: PriceHistory[];
}

export default function PriceChart({ data }: Props) {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const formattedData = sortedData.map((item) => {
    const d = new Date(item.date);
    const dateLabel = `${d.getDate().toString().padStart(2, "0")}/${(
      d.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
    return { ...item, dateLabel };
  });
  const yDomain: AxisDomain = formattedData.length > 0 ? [0, 120] : [];
  return (
    <div style={{ width: "100%", height: 300, marginTop: "1rem" }}>
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <XAxis dataKey="dateLabel" />
          <YAxis domain={yDomain} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "price") {
                return [`R$ ${value.toFixed(2)}`, "Preço"];
              }
              return value;
            }}
            labelFormatter={(label: string, payload: any[]) => {
              const item = payload[0]?.payload;
              return `${label}${item?.notes ? `\n📝 ${item.notes}` : ""}`;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#1976d2"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
