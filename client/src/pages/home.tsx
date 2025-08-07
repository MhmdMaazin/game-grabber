import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FiltersSection from "@/components/filters-section";
import GiveawayCard from "@/components/giveaway-card";
import Footer from "@/components/footer";
import type { Giveaway } from "@shared/schema";
import type { FilterState } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    platform: 'all',
    type: 'all',
    sort: 'date'
  });

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (filters.platform && filters.platform !== 'all') {
    queryParams.append('platform', filters.platform);
  }
  if (filters.type && filters.type !== 'all') {
    queryParams.append('type', filters.type);
  }
  if (filters.sort) {
    queryParams.append('sort', filters.sort);
  }
  if (filters.search) {
    queryParams.append('search', filters.search);
  }

  const queryString = queryParams.toString();
  const apiUrl = queryString ? `/api/giveaways?${queryString}` : '/api/giveaways';

  const { data: giveaways = [], isLoading, error } = useQuery<Giveaway[]>({
    queryKey: [apiUrl],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FiltersSection filters={filters} onFiltersChange={setFilters} />

      <main className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12" data-testid="loading-state">
            <div className="inline-block w-16 h-16 border-4 border-neon-green border-t-transparent animate-spin"></div>
            <p className="text-neon-cyan mt-4">LOADING GIVEAWAYS...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12" data-testid="error-state">
            <div className="text-game-red text-lg mb-4">⚠️ ERROR</div>
            <p className="text-neon-cyan">
              Failed to load giveaways. Please check your connection and try again.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && giveaways.length === 0 && (
          <div className="text-center py-12" data-testid="empty-state">
            <div className="text-neon-yellow text-lg mb-4">🎮 NO GIVEAWAYS FOUND</div>
            <p className="text-neon-cyan">
              No giveaways match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}

        {/* Giveaways Grid */}
        {!isLoading && !error && giveaways.length > 0 && (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            data-testid="giveaways-grid"
          >
            {giveaways.map((giveaway) => (
              <GiveawayCard key={giveaway.id} giveaway={giveaway} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
