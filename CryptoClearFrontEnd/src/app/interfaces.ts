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

export interface CombinedTransactions {
  coinId: string;
  cumulativeQuantity: number;
  cumlativePurchasePrice: number;
  currentCoinPrice: number;
  netCoinValue: number;
  coinTransactions: Transaction[];
}
