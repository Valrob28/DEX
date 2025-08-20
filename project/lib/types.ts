export interface TokenProject {
  mint: string;
  name: string;
  symbol: string;
  supply: number;
  creator: string;
  description?: string;
  image?: string;
  price: number;
  fdv: number;
  volume24h: number;
  liquidityPool?: string;
  createdAt: Date;
  lastActivity: Date;
}

export interface LightStats {
  totalSupply: number;
  burnedSupply: number;
  circulatingSupply: number;
  currentPrice: number;
  marketCap: number;
  totalBuybacks: number;
  lastBuyback: Date;
  buybackAmount: number;
}

export interface Transaction {
  signature: string;
  type: 'create' | 'buy' | 'sell' | 'burn' | 'buyback';
  amount: number;
  token: string;
  user: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface GlobalConfig {
  feePercentage: number;
  lightTokenMint: string;
  treasuryWallet: string;
  minLiquidity: number;
}