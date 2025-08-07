import { BitInput } from "@/components/ui/8bit-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BitButton } from "@/components/ui/8bit-button";
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
            <BitInput
              type="text"
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
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="text-neon-cyan text-xs">FILTER BY TYPE:</span>
          <BitButton
            variant={filters.type === 'game' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTypeFilter('game')}
            data-testid="filter-game"
          >
            GAMES
          </BitButton>
          <BitButton
            variant={filters.type === 'loot' ? 'neon' : 'ghost'}
            size="sm"
            onClick={() => handleTypeFilter('loot')}
            data-testid="filter-loot"
          >
            LOOT
          </BitButton>
          <BitButton
            variant={filters.type === 'beta' ? 'destructive' : 'ghost'}
            size="sm"
            onClick={() => handleTypeFilter('beta')}
            data-testid="filter-beta"
          >
            BETA ACCESS
          </BitButton>
          <BitButton
            variant="secondary"
            size="sm"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            CLEAR ALL
          </BitButton>
        </div>
      </div>
    </section>
  );
}
