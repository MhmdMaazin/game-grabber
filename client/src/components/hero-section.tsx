import { useQuery } from "@tanstack/react-query";
import type { GiveawayStats } from "@/lib/types";

export default function HeroSection() {
  const { data: stats, isLoading } = useQuery<GiveawayStats>({
    queryKey: ['/api/stats'],
  });

  return (
    <section className="bg-gradient-to-r from-dark-bg via-dark-secondary to-dark-bg py-12 relative overflow-hidden">
      {/* Retro background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, var(--neon-green) 8px, var(--neon-green) 10px)'}}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl text-neon-green mb-4 animate-glitch" data-testid="hero-title">
          FREE GAMES
        </h2>
        <p className="text-neon-cyan text-lg mb-8" data-testid="hero-subtitle">
          CLAIM YOUR DIGITAL TREASURES
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-dark-tertiary border-2 border-neon-green p-4">
            <div className="text-2xl text-neon-yellow" data-testid="stat-total">
              {isLoading ? "..." : stats?.totalGiveaways || 0}
            </div>
            <div className="text-xs text-neon-cyan">ACTIVE</div>
          </div>
          <div className="bg-dark-tertiary border-2 border-neon-pink p-4">
            <div className="text-2xl text-neon-yellow" data-testid="stat-value">
              {isLoading ? "..." : `$${Math.round(stats?.totalValue || 0)}`}
            </div>
            <div className="text-xs text-neon-cyan">VALUE</div>
          </div>
          <div className="bg-dark-tertiary border-2 border-neon-purple p-4">
            <div className="text-2xl text-neon-yellow" data-testid="stat-platforms">
              {isLoading ? "..." : stats?.platforms || 0}
            </div>
            <div className="text-xs text-neon-cyan">PLATFORMS</div>
          </div>
          <div className="bg-dark-tertiary border-2 border-neon-yellow p-4">
            <div className="text-2xl text-neon-yellow" data-testid="stat-new-today">
              {isLoading ? "..." : stats?.newToday || 0}
            </div>
            <div className="text-xs text-neon-cyan">NEW TODAY</div>
          </div>
        </div>
      </div>
    </section>
  );
}
