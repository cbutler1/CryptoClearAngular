export interface User {
  id: number;
  name: string;
  liquidCash: number;
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
