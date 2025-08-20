import { TokenProject, LightStats, Transaction } from './types';

export const mockProjects: TokenProject[] = [
  {
    mint: "11111111111111111111111111111112",
    name: "DogeCoin Mania",
    symbol: "DOGEM",
    supply: 1000000000,
    creator: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    description: "The ultimate doge meme token",
    price: 0.00045,
    fdv: 450000,
    volume24h: 125000,
    createdAt: new Date('2024-01-15'),
    lastActivity: new Date('2024-01-18')
  },
  {
    mint: "11111111111111111111111111111113",
    name: "Pepe Revolution",
    symbol: "PEPER",
    supply: 500000000,
    creator: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    description: "Revolutionary Pepe community token",
    price: 0.00089,
    fdv: 445000,
    volume24h: 89000,
    createdAt: new Date('2024-01-16'),
    lastActivity: new Date('2024-01-18')
  },
  {
    mint: "11111111111111111111111111111114",
    name: "Shiba Heaven",
    symbol: "SHEAVY",
    supply: 2000000000,
    creator: "4vMsoUT2BWatFweudnQM1xedRLfJgJ7hsigBL5tKpAoE",
    description: "Heavenly Shiba community",
    price: 0.00023,
    fdv: 460000,
    volume24h: 203000,
    createdAt: new Date('2024-01-17'),
    lastActivity: new Date('2024-01-18')
  }
];

export const lightStats: LightStats = {
  totalSupply: 100000000,
  burnedSupply: 12500000,
  circulatingSupply: 87500000,
  currentPrice: 2.34,
  marketCap: 204750000,
  totalBuybacks: 47,
  lastBuyback: new Date('2024-01-18T10:30:00'),
  buybackAmount: 15000
};

export const recentTransactions: Transaction[] = [
  {
    signature: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    type: 'buy',
    amount: 1000,
    token: 'DOGEM',
    user: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    timestamp: new Date('2024-01-18T15:30:00'),
    status: 'confirmed'
  },
  {
    signature: "4CkQJAHyPEyrPU4hKGxjd8fUYbRzTgP7",
    type: 'burn',
    amount: 2500,
    token: 'LIGHT',
    user: "treasury",
    timestamp: new Date('2024-01-18T14:45:00'),
    status: 'confirmed'
  },
  {
    signature: "3BjQKEHxMDxpMT3gJFxhc7eUXcRySeN6",
    type: 'sell',
    amount: 500,
    token: 'PEPER',
    user: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    timestamp: new Date('2024-01-18T13:20:00'),
    status: 'confirmed'
  }
];