import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { FilterState } from "@/lib/types";

interface FiltersSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FiltersSection({ filters, onFiltersChange }: FiltersSectionProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handlePlatformChange = (value: string) => {
    onFiltersChange({ ...filters, platform: value });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sort: value });
  };

  const handleTypeFilter = (type: string) => {
    onFiltersChange({ ...filters, type: filters.type === type ? 'all' : type });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      platform: 'all',
      type: 'all',
      sort: 'date'
    });
  };

  return (
    <section className="bg-dark-secondary py-8 border-b-2 border-neon-cyan">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-neon-green text-xs mb-2">SEARCH GAMES</label>
            <Input
              type="text"
              className="w-full px-4 py-3 bg-dark-bg border-2 border-neon-green text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none retro-button text-xs"
              placeholder="Enter game title..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              data-testid="input-search"
            />
          </div>
          
          {/* Platform Filter */}
          <div>
            <label className="block text-neon-green text-xs mb-2">PLATFORM</label>
            <Select value={filters.platform} onValueChange={handlePlatformChange}>
              <SelectTrigger 
                className="w-full px-4 py-3 bg-dark-bg border-2 border-neon-green text-white focus:border-neon-cyan focus:outline-none retro-button text-xs"
                data-testid="select-platform"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-bg border-2 border-neon-green text-white">
                <SelectItem value="all">ALL PLATFORMS</SelectItem>
                <SelectItem value="steam">STEAM</SelectItem>
                <SelectItem value="epic-games-store">EPIC GAMES</SelectItem>
                <SelectItem value="gog">GOG</SelectItem>
                <SelectItem value="ubisoft">UBISOFT</SelectItem>
                <SelectItem value="origin">ORIGIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort By */}
          <div>
            <label className="block text-neon-green text-xs mb-2">SORT BY</label>
            <Select value={filters.sort} onValueChange={handleSortChange}>
              <SelectTrigger 
                className="w-full px-4 py-3 bg-dark-bg border-2 border-neon-green text-white focus:border-neon-cyan focus:outline-none retro-button text-xs"
                data-testid="select-sort"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-bg border-2 border-neon-green text-white">
                <SelectItem value="date">NEWEST FIRST</SelectItem>
                <SelectItem value="value">HIGHEST VALUE</SelectItem>
                <SelectItem value="popularity">MOST POPULAR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Enhanced Filter Tabs */}
        <div className="mt-6">
          <Tabs value={filters.type || 'all'} onValueChange={(value) => onFiltersChange({ ...filters, type: value })} className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge className="text-neon-cyan bg-dark-bg border border-neon-cyan">FILTER BY TYPE:</Badge>
                <TabsList className="bg-dark-bg border-2 border-neon-green">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg text-white"
                    data-testid="filter-all"
                  >
                    ALL
                  </TabsTrigger>
                  <TabsTrigger 
                    value="game" 
                    className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg text-white"
                    data-testid="filter-game"
                  >
                    GAMES
                  </TabsTrigger>
                  <TabsTrigger 
                    value="loot" 
                    className="data-[state=active]:bg-neon-pink data-[state=active]:text-dark-bg text-white"
                    data-testid="filter-loot"
                  >
                    LOOT
                  </TabsTrigger>
                  <TabsTrigger 
                    value="beta" 
                    className="data-[state=active]:bg-neon-purple data-[state=active]:text-white text-white"
                    data-testid="filter-beta"
                  >
                    BETA
                  </TabsTrigger>
                </TabsList>
              </div>
              <Button
                variant="outline"
                className="border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-dark-bg text-xs retro-button"
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                CLEAR ALL
              </Button>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
