export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: Roi;
  last_updated: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

// This interface works for all date ranges 1, 14, 30, 365, and max
export interface CoinHistory {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}
