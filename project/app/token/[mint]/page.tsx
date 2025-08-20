import { notFound } from 'next/navigation';
import { mockProjects } from '@/lib/mock-data';
import { TradingPanel } from '@/components/trading-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, User, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate mock price data
const generatePriceData = () => {
  const data = [];
  let price = 0.00045;
  
  for (let i = 0; i < 24; i++) {
    price = price * (1 + (Math.random() - 0.5) * 0.1);
    data.push({
      time: `${i}:00`,
      price: parseFloat(price.toFixed(6))
    });
  }
  return data;
};

interface TokenPageProps {
  params: {
    mint: string;
  };
}

export default function TokenPage({ params }: TokenPageProps) {
  const project = mockProjects.find(p => p.mint === params.mint);

  if (!project) {
    notFound();
  }

  const priceData = generatePriceData();
  const priceChange = Math.random() > 0.5;
  const changePercent = (Math.random() * 20 - 10).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Token Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {project.symbol.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <p className="text-xl text-gray-400">${project.symbol}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge variant={priceChange ? "default" : "destructive"}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {changePercent}% (24h)
          </Badge>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Copy className="w-4 h-4 mr-2" />
            {params.mint.slice(0, 8)}...{params.mint.slice(-8)}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Solscan
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Price Chart and Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Chart */}
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Price Chart (24H)</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">${project.price.toFixed(6)}</div>
                  <div className={`text-sm ${priceChange ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChange ? '+' : ''}{changePercent}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
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
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900/30 border-gray-800/30 text-center p-4">
              <div className="text-lg font-bold text-white">${project.fdv.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Market Cap</div>
            </Card>
            <Card className="bg-gray-900/30 border-gray-800/30 text-center p-4">
              <div className="text-lg font-bold text-white">${project.volume24h.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">24h Volume</div>
            </Card>
            <Card className="bg-gray-900/30 border-gray-800/30 text-center p-4">
              <div className="text-lg font-bold text-white">{project.supply.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Supply</div>
            </Card>
            <Card className="bg-gray-900/30 border-gray-800/30 text-center p-4">
              <div className="text-lg font-bold text-white">{(project.supply * 0.8).toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Circulating</div>
            </Card>
          </div>

          {/* Token Info */}
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Token Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-semibold">Creator</p>
                  <p className="text-gray-400 text-sm">{project.creator.slice(0, 8)}...{project.creator.slice(-8)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-semibold">Created</p>
                  <p className="text-gray-400 text-sm">{project.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              {project.description && (
                <div>
                  <p className="text-white font-semibold mb-2">Description</p>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Trading Panel */}
        <div className="space-y-6">
          <TradingPanel project={project} />
          
          {/* Recent Activity */}
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Buy 1,000 DOGEM', 'Sell 500 DOGEM', 'Buy 2,500 DOGEM'].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                    <span className="text-gray-300 text-sm">{activity}</span>
                    <span className="text-gray-400 text-xs">{i + 2}m ago</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}