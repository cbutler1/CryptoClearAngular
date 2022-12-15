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

export interface stockCharts{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}