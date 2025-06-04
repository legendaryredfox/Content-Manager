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
