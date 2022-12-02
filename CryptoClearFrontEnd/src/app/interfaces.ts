export interface User {
  id: Number;
  name: String;
  liquidCash: Number;
  transactions?: Transaction[];
}

export interface Transaction {
  id: number;
  userId: number;
  transactionDate: Date;
  coinId: string;
  quantity: number;
  purchasePrice: number;
}
