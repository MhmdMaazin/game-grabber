import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { Giveaway } from "@shared/schema";

interface GiveawayCardProps {
  giveaway: Giveaway;
}

export default function GiveawayCard({ giveaway }: GiveawayCardProps) {
  const formatEndDate = (endDate: string | null) => {
    if (!endDate || endDate === "N/A") return "No expiration";
    
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Ends today";
    if (diffDays === 1) return "Ends tomorrow";
    if (diffDays < 7) return `Ends in ${diffDays} days`;
    return `Ends ${end.toLocaleDateString()}`;
  };

  const getBorderColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'loot': return 'border-neon-yellow';
      case 'beta': return 'border-game-red';
      default: return 'border-neon-green';
    }
  };

  const getButtonColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'loot': return 'bg-neon-yellow text-dark-bg hover:bg-neon-green';
      case 'beta': return 'bg-game-red text-white hover:bg-neon-yellow hover:text-dark-bg';
      default: return 'bg-neon-green text-dark-bg hover:bg-neon-cyan';
    }
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('steam')) return 'bg-neon-green text-dark-bg';
    if (platformLower.includes('epic')) return 'bg-neon-purple text-white';
    if (platformLower.includes('gog')) return 'bg-game-red text-white';
    return 'bg-neon-cyan text-dark-bg';
  };

  const handleClaimClick = () => {
    if (giveaway.open_giveaway_url) {
      window.open(giveaway.open_giveaway_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`bg-dark-secondary border-2 ${getBorderColor(giveaway.type)} hover:border-neon-cyan transition-all duration-300 hover:neon-glow group cursor-pointer`}>
      <div 
        onClick={() => window.location.href = `/giveaway/${giveaway.id}`}
        className="block"
      >
        <div className="relative overflow-hidden">
          <img 
            src={giveaway.image || giveaway.thumbnail} 
            alt={giveaway.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300/1a1a1a/00ff41?text=No+Image';
            }}
          />
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
              <div className="bg-gray-600 text-white px-2 py-1 text-xs line-through">
                {giveaway.worth}
              </div>
            )}
            <div className="bg-neon-green text-dark-bg px-2 py-1 text-xs font-bold animate-pixel-pulse">
              FREE
            </div>
          </div>
          <div className={`absolute top-2 left-2 px-2 py-1 text-xs ${getPlatformColor(giveaway.platforms)}`}>
            {giveaway.platforms.split(',')[0].trim().toUpperCase()}
          </div>
        </div>
        
        <div className="p-4 pb-2">
          <h3 
            className="text-neon-yellow text-sm mb-2 truncate hover:text-neon-green transition-colors" 
            data-testid={`title-${giveaway.id}`}
          >
            {giveaway.title}
          </h3>
          <p className="text-gray-400 text-xs mb-3 line-clamp-2" data-testid={`description-${giveaway.id}`}>
            {giveaway.description}
          </p>
          
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-neon-cyan" data-testid={`type-${giveaway.id}`}>
              {giveaway.type}
            </span>
            <span className="text-neon-pink" data-testid={`end-date-${giveaway.id}`}>
              {formatEndDate(giveaway.end_date)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Claim button positioned normally but with event handling to prevent card navigation */}
      <div className="px-4 pb-4">
        <Button
          className={`w-full py-2 px-4 transition-colors retro-button text-xs ${getButtonColor(giveaway.type)}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClaimClick();
          }}
          data-testid={`button-claim-${giveaway.id}`}
        >
          {giveaway.type.toLowerCase() === 'beta' ? 'JOIN BETA' : 'CLAIM NOW'}
        </Button>
      </div>
    </div>
  );
}
