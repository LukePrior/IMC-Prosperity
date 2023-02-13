export interface Performance {
  day: number;
  timestamp: number;
  product: string;
  bid_price_1: number;
  bid_volume_1: number;
  bid_price_2?: number | null;
  bid_volume_2?: number | null;
  bid_price_3?: number | null;
  bid_volume_3?: number | null;
  ask_price_1: number;
  ask_volume_1: number;
  ask_price_2?: number | null;
  ask_volume_2?: number | null;
  ask_price_3?: number | null;
  ask_volume_3?: number | null;
  mid_price: number;
  profit_and_loss: number;
}
