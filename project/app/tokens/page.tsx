import { TokenCard } from '@/components/token-card';
import { mockProjects } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export default function TokensPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">All Tokens</h1>
        <p className="text-xl text-gray-400">
          Discover and trade the latest memecoins on Heaven.xyz
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tokens..."
            className="pl-10 bg-gray-800/50 border-gray-700 text-white"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <TokenCard key={project.mint} project={project} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-600/20">
          Load More Tokens
        </Button>
      </div>
    </div>
  );
}