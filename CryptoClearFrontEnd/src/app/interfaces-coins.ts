export interface coinInformation {
  symbol: String;
  base_currency: String;
  quote_currency: String;
  tick_size: Number;
  quote_increment: Number;
  min_order_size: String;
  status: String;
  wrap_enabled: Boolean;
}

export interface coinSimple {
  pair: String;
  price: String;
  percent: String;
}

export interface coinDetailed {
  symbol: String;
  open: String;
  high: String;
  low: String;
  close: String;
  changes: String[];
  bid: String;
  ask: String;
}

export interface coinHistory {}
