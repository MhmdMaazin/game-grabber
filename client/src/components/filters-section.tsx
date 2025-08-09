import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Use the installed 8bitcn Button
import { Button } from "@/components/ui/8bit/button";
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
    <section className="bg-dark-secondary py-8 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-white text-xs mb-2">SEARCH GAMES</label>
            <Input
              type="text"
              className="w-full px-4 py-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-gray-400 focus:outline-none retro-button text-xs"
              placeholder="Enter game title..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              data-testid="input-search"
            />
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-white text-xs mb-2">PLATFORM</label>
            <Select value={filters.platform} onValueChange={handlePlatformChange}>
              <SelectTrigger 
                className="w-full px-4 py-3 bg-dark-bg border border-gray-600 text-white focus:border-gray-400 focus:outline-none retro-button text-xs"
                data-testid="select-platform"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-bg border border-gray-600 text-white">
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
            <label className="block text-white text-xs mb-2">SORT BY</label>
            <Select value={filters.sort} onValueChange={handleSortChange}>
              <SelectTrigger 
                className="w-full px-4 py-3 bg-dark-bg border border-gray-600 text-white focus:border-gray-400 focus:outline-none retro-button text-xs"
                data-testid="select-sort"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-bg border border-gray-600 text-white">
                <SelectItem value="date">NEWEST FIRST</SelectItem>
                <SelectItem value="value">HIGHEST VALUE</SelectItem>
                <SelectItem value="popularity">MOST POPULAR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-gray-300 text-xs whitespace-nowrap">FILTER BY TYPE:</span>
          <Button
            variant="outline"
            size="sm"
            font="retro"
            className="px-3 py-1 text-[10px] md:text-xs retro-button-white"
            onClick={() => handleTypeFilter('game')}
            data-testid="filter-game"
          >
            GAMES
          </Button>
          <Button
            variant="outline"
            size="sm"
            font="retro"
            className="px-3 py-1 text-[10px] md:text-xs retro-button-white"
            onClick={() => handleTypeFilter('loot')}
            // data-testid="filter-loot"
          >
            LOOT
          </Button>
          <Button
            variant="outline"
            size="sm"
            font="retro"
            className="px-3 py-1 text-[10px] md:text-xs retro-button-white"
            onClick={() => handleTypeFilter('beta')}
            data-testid="filter-beta"
          >
            BETA ACCESS
          </Button>
          <Button
            variant="outline"
            size="sm"
            font="retro"
            className="px-3 py-1 text-[10px] md:text-xs retro-button-white"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            CLEAR ALL
          </Button>
        </div>
      </div>
    </section>
  );
}