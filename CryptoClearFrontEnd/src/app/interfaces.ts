export interface User {
  id: string;
  name: string;
  liquidCash: number;
  transactions?: Transaction[];
}

export interface Transaction {
  id: number;
  userId: string;
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
