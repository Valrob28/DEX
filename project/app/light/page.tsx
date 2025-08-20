'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { lightStats, recentTransactions } from '@/lib/mock-data';
import { Coins, TrendingUp, Flame, Zap, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Generate mock price data for LIGHT
const generateLightPriceData = () => {
  const data = [];
  let price = lightStats.currentPrice;
  
  for (let i = 0; i < 30; i++) {
    price = price * (1 + (Math.random() - 0.3) * 0.05); // Slight upward trend
    data.push({
      day: i + 1,
      price: parseFloat(price.toFixed(2))
    });
  }
  return data;
};

// Supply distribution data
const supplyData = [
  { name: 'Circulating', value: lightStats.circulatingSupply, color: '#8B5CF6' },
  { name: 'Burned', value: lightStats.burnedSupply, color: '#EF4444' }
];

export default function LightPage() {
  const priceData = generateLightPriceData();
  const burnPercentage = ((lightStats.burnedSupply / lightStats.totalSupply) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* LIGHT Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">LIGHT Token</h1>
            <p className="text-xl text-gray-400">The Heart of Heaven.xyz</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5% (30d)
          </Badge>
          <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">
            <Flame className="w-3 h-3 mr-1" />
            {burnPercentage}% Burned
          </Badge>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-800/50 text-center p-6">
          <div className="text-3xl font-bold text-white mb-2">${lightStats.currentPrice}</div>
          <div className="text-gray-400">Current Price</div>
          <div className="text-green-400 text-sm mt-1">+12.5%</div>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800/50 text-center p-6">
          <div className="text-3xl font-bold text-white mb-2">${lightStats.marketCap.toLocaleString()}</div>
          <div className="text-gray-400">Market Cap</div>
          <div className="text-blue-400 text-sm mt-1">Rank #1</div>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800/50 text-center p-6">
          <div className="text-3xl font-bold text-red-400 mb-2">{lightStats.burnedSupply.toLocaleString()}</div>
          <div className="text-gray-400">Tokens Burned</div>
          <div className="text-red-400 text-sm mt-1">{burnPercentage}% of supply</div>
        </Card>
        
        <Card className="bg-gray-900/50 border-gray-800/50 text-center p-6">
          <div className="text-3xl font-bold text-purple-400 mb-2">{lightStats.totalBuybacks}</div>
          <div className="text-gray-400">Total Buybacks</div>
          <div className="text-purple-400 text-sm mt-1">Last: {lightStats.lastBuyback.toLocaleDateString()}</div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Chart */}
        <Card className="bg-gray-900/50 border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">LIGHT Price (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#EAB308"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Supply Distribution */}
        <Card className="bg-gray-900/50 border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">Token Supply Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supplyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {supplyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Circulating: {lightStats.circulatingSupply.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">Burned: {lightStats.burnedSupply.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mechanism Explanation */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-green-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            How LIGHT Buybacks Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-white font-semibold">Trade Fees</h3>
              <p className="text-gray-300 text-sm">1% of all token trades on Heaven.xyz are collected as platform fees</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-white font-semibold">Auto Buyback</h3>
              <p className="text-gray-300 text-sm">Fees are automatically used to buy LIGHT tokens via Jupiter aggregator</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-red-400">3</span>
              </div>
              <h3 className="text-white font-semibold">Burn Forever</h3>
              <p className="text-gray-300 text-sm">Bought LIGHT tokens are permanently burned, reducing total supply</p>
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Next Buyback Estimated:</span>
              <span className="text-green-400">~2 hours</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Accumulated Fees:</span>
              <span className="text-white">~$4,250</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Buybacks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { amount: 15000, value: 4250, time: '2 hours ago' },
                { amount: 12300, value: 3680, time: '8 hours ago' },
                { amount: 18500, value: 5200, time: '1 day ago' },
                { amount: 9800, value: 2890, time: '2 days ago' }
              ].map((buyback, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{buyback.amount.toLocaleString()} LIGHT Burned</p>
                      <p className="text-gray-400 text-sm">${buyback.value.toLocaleString()} worth</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{buyback.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white">Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-green-600/20' : 
                      tx.type === 'sell' ? 'bg-red-600/20' : 
                      'bg-purple-600/20'
                    }`}>
                      {tx.type === 'buy' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                       tx.type === 'sell' ? <TrendingUp className="w-4 h-4 text-red-400 rotate-180" /> :
                       <Flame className="w-4 h-4 text-purple-400" />}
                    </div>
                    <div>
                      <p className="text-white font-semibold capitalize">{tx.type} {tx.token}</p>
                      <p className="text-gray-400 text-sm">{tx.amount.toLocaleString()} tokens</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {Math.floor((Date.now() - tx.timestamp.getTime()) / 60000)}m ago
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <p className="text-gray-400">Ready to join the LIGHT ecosystem?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            <Coins className="w-5 h-5 mr-2" />
            Buy LIGHT
          </Button>
          <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-600/20">
            <ExternalLink className="w-5 h-5 mr-2" />
            View on Solscan
          </Button>
        </div>
      </div>
    </div>
  );
}