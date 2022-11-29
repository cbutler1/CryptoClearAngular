export interface User {
  Id: Number;
  Name: String;
  LiquidCash: Number;
  Transactions?: Transaction[];
}

export interface Transaction {
  Id: Number;
  UserId: Number;
  TransactionDate: Date;
  CoinSymbol: String;
  Quantity: Number;
  PurchasePrice: Number;
}
