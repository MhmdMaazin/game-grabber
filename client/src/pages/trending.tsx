import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import GiveawayCard from "../components/giveaway-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Gift, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

type Giveaway = {
  id: number;
  title: string;
  worth: string;
  thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  users: number;
  status: string;
  gamerpower_url: string;
};

type Stats = {
  totalGiveaways: number;
  totalValue: string;
  platforms: Record<string, number>;
  types: Record<string, number>;
};

export default function Trending() {
  const [sortBy, setSortBy] = useState<'popularity' | 'value' | 'date'>('popularity');

  const { data: giveaways = [], isLoading: giveawaysLoading } = useQuery<Giveaway[]>({
    queryKey: ['/api/giveaways'],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  // Sort giveaways based on selected criteria
  const sortedGiveaways = giveaways ? [...giveaways].sort((a, b) => {
    if (sortBy === 'popularity') {
      return b.users - a.users;
    } else if (sortBy === 'value') {
      const aValue = parseFloat(a.worth.replace(/[^0-9.]/g, '')) || 0;
      const bValue = parseFloat(b.worth.replace(/[^0-9.]/g, '')) || 0;
      return bValue - aValue;
    } else {
      return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
    }
  }) : [];

  const maxUsers = giveaways && giveaways.length > 0 ? giveaways.reduce((max, g) => Math.max(max, g.users), 0) : 0;


  const topGiveaways = giveaways?.reduce((acc, giveaway) => {
    const value = parseFloat(giveaway.worth.replace(/[^0-9.]/g, ''));
    if (value > 0) {
      acc.push({ ...giveaway, numericValue: value });
    }
    return acc;
  }, [] as Array<any>)
    ?.sort((a, b) => b.numericValue - a.numericValue)
    ?.slice(0, 10) || [];

  if (giveawaysLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading trending giveaways...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl text-white mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8" />
            TRENDING GIVEAWAYS
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Discover the most popular and valuable free games and content trending right now
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-1">
                <Gift className="w-3 h-3" />
                ACTIVE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-white text-lg font-bold">{stats?.totalGiveaways || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                TOTAL VALUE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-green-500 text-lg font-bold">${stats?.totalValue || '0'}</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                TOP PLATFORM
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-white text-sm font-bold">
                {stats?.platforms && Object.keys(stats.platforms).length > 0 
                  ? Object.entries(stats.platforms).reduce((a, b) => a[1] > b[1] ? a : b)[0].toUpperCase() 
                  : 'STEAM'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-xs">HOT TYPE</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-white text-sm font-bold">
                {stats?.types && Object.keys(stats.types).length > 0 
                  ? Object.entries(stats.types).reduce((a, b) => a[1] > b[1] ? a : b)[0].toUpperCase() 
                  : 'GAME'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            onClick={() => setSortBy('popularity')}
            className={`retro-button text-xs ${
              sortBy === 'popularity' 
                ? 'bg-gray-600 text-white' 
                : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            data-testid="sort-popularity"
          >
            <Users className="w-3 h-3 mr-1" />
            MOST POPULAR
          </Button>
          <Button
            onClick={() => setSortBy('value')}
            className={`retro-button text-xs ${
              sortBy === 'value' 
                ? 'bg-gray-600 text-white' 
                : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            data-testid="sort-value"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            HIGHEST VALUE
          </Button>
          <Button
            onClick={() => setSortBy('date')}
            className={`retro-button text-xs ${
              sortBy === 'date' 
                ? 'bg-gray-600 text-white' 
                : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            data-testid="sort-date"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            NEWEST
          </Button>
        </div>

        {/* Trending Giveaways Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topGiveaways.map((giveaway) => (
            <GiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))}
        </div>

        {topGiveaways.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No trending giveaways found at the moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}