import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { GiveawayStats } from "@/lib/types";

export default function HeroSection() {
  const { data: stats, isLoading } = useQuery<GiveawayStats>({
    queryKey: ['/api/stats'],
  });

  const { data: worthData } = useQuery<{active_giveaways_number: number, worth_estimation_usd: number}>({
    queryKey: ['/api/worth'],
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-dark-tertiary border-2 border-neon-green p-4 relative overflow-hidden">
            <div className="text-2xl text-neon-yellow mb-2" data-testid="stat-total">
              {isLoading ? (
                <Progress value={33} className="w-full h-6 bg-dark-bg" />
              ) : (
                worthData?.active_giveaways_number || stats?.totalGiveaways || 0
              )}
            </div>
            <Badge variant="secondary" className="text-neon-cyan bg-dark-bg border border-neon-cyan text-xs">
              ACTIVE GAMES
            </Badge>
          </div>
          
          <div className="bg-dark-tertiary border-2 border-neon-pink p-4 relative overflow-hidden">
            <div className="text-2xl text-neon-yellow mb-2" data-testid="stat-value">
              {isLoading ? (
                <Progress value={66} className="w-full h-6 bg-dark-bg" />
              ) : (
                `$${Math.round(worthData?.worth_estimation_usd || stats?.totalValue || 0)}`
              )}
            </div>
            <Badge variant="secondary" className="text-neon-pink bg-dark-bg border border-neon-pink text-xs">
              TOTAL WORTH
            </Badge>
          </div>
          
          <div className="bg-dark-tertiary border-2 border-neon-purple p-4 relative overflow-hidden">
            <div className="text-2xl text-neon-yellow mb-2" data-testid="stat-platforms">
              {isLoading ? (
                <Progress value={80} className="w-full h-6 bg-dark-bg" />
              ) : (
                stats?.platforms || 0
              )}
            </div>
            <Badge variant="secondary" className="text-neon-purple bg-dark-bg border border-neon-purple text-xs">
              PLATFORMS
            </Badge>
          </div>
          
          <div className="bg-dark-tertiary border-2 border-neon-yellow p-4 relative overflow-hidden">
            <div className="text-2xl text-neon-yellow mb-2" data-testid="stat-new-today">
              {isLoading ? (
                <Progress value={45} className="w-full h-6 bg-dark-bg" />
              ) : (
                stats?.newToday || 0
              )}
            </div>
            <Badge variant="secondary" className="text-neon-yellow bg-dark-bg border border-neon-yellow text-xs">
              NEW TODAY
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
