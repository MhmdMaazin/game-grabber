import { useQuery } from "@tanstack/react-query";
import { Frame } from "@/components/ui/8bit/frame";
import type { GiveawayStats } from "@/lib/types";

export default function HeroSection() {
  const { data: stats, isLoading } = useQuery<GiveawayStats>({
    queryKey: ['/api/stats'],
  });

  return (
    <section className="bg-dark-bg py-12 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '20px 20px'}}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl text-white mb-4" data-testid="hero-title">
          FREE GAMES
        </h2>
        <p className="text-gray-300 text-lg mb-8" data-testid="hero-subtitle">
          Discover and claim amazing game giveaways
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <Frame className="bg-dark-secondary p-4">
            <div className="text-2xl text-white" data-testid="stat-total">
              {isLoading ? "..." : stats?.totalGiveaways || 0}
            </div>
            <div className="text-xs text-gray-400">ACTIVE</div>
          </Frame>
          <Frame className="bg-dark-secondary p-4">
            <div className="text-2xl text-white" data-testid="stat-value">
              {isLoading ? "..." : `$${Math.round(stats?.totalValue || 0)}`}
            </div>
            <div className="text-xs text-gray-400">VALUE</div>
          </Frame>
          <Frame className="bg-dark-secondary p-4">
            <div className="text-2xl text-white" data-testid="stat-platforms">
              {isLoading ? "..." : stats?.platforms || 0}
            </div>
            <div className="text-xs text-gray-400">PLATFORMS</div>
          </Frame>
          <Frame className="bg-dark-secondary p-4">
            <div className="text-2xl text-white" data-testid="stat-new-today">
              {isLoading ? "..." : stats?.newToday || 0}
            </div>
            <div className="text-xs text-gray-400">NEW TODAY</div>
          </Frame>
        </div>
      </div>
    </section>
  );
}
