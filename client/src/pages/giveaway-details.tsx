import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BitButton } from "@/components/ui/8bit-button";
import { BitBadge } from "@/components/ui/8bit-badge";
import { ArrowLeft, ExternalLink, Calendar, Users, Tag } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Giveaway } from "@shared/schema";

export default function GiveawayDetails() {
  const [match, params] = useRoute("/giveaway/:id");
  const giveawayId = params?.id;

  const { data: giveaway, isLoading, error } = useQuery<Giveaway>({
    queryKey: [`/api/giveaway/${giveawayId}`],
    enabled: !!giveawayId,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClaimClick = () => {
    if (giveaway?.open_giveaway_url) {
      window.open(giveaway.open_giveaway_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <BitButton variant="outline" data-testid="button-back">
              <ArrowLeft size={16} />
              BACK TO GIVEAWAYS
            </BitButton>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12" data-testid="loading-state">
            <div className="inline-block w-16 h-16 border-4 border-neon-green border-t-transparent animate-spin"></div>
            <p className="text-neon-cyan mt-4">LOADING GIVEAWAY...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12" data-testid="error-state">
            <div className="text-game-red text-lg mb-4">⚠️ ERROR</div>
            <p className="text-neon-cyan">Failed to load giveaway details.</p>
            <p className="text-gray-400 text-xs mt-2">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
          </div>
        )}

        {/* Giveaway Details */}
        {giveaway && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={giveaway.image || giveaway.thumbnail}
                  alt={giveaway.title}
                  className="w-full rounded-none border-2 border-neon-green"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400/1a1a1a/00ff41?text=No+Image';
                  }}
                  data-testid="giveaway-image"
                />
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
                    <BitBadge variant="outline" className="bg-gray-600 text-white line-through text-sm">
                      {giveaway.worth}
                    </BitBadge>
                  )}
                  <BitBadge variant="free" className="text-lg">
                    FREE
                  </BitBadge>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <BitButton
                  variant="neon"
                  className="flex-1"
                  onClick={handleClaimClick}
                  data-testid="button-claim-main"
                >
                  <ExternalLink size={16} className="mr-2" />
                  {giveaway.type.toLowerCase() === 'beta' ? 'JOIN BETA' : 'CLAIM NOW'}
                </BitButton>
                
                {giveaway.gamerpower_url && (
                  <BitButton
                    variant="secondary"
                    onClick={() => window.open(giveaway.gamerpower_url, '_blank', 'noopener,noreferrer')}
                    data-testid="button-view-more"
                  >
                    VIEW MORE
                  </BitButton>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-neon-yellow mb-4" data-testid="giveaway-title">
                  {giveaway.title}
                </h1>
                
                {/* Price Section */}
                {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
                  <div className="bg-dark-secondary border-2 border-neon-green p-4 mb-6 text-center">
                    <div className="text-neon-green text-xs mb-2">ORIGINAL PRICE</div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-gray-400 text-xl line-through" data-testid="original-price">
                        {giveaway.worth}
                      </div>
                      <div className="text-neon-green text-2xl font-bold animate-pixel-pulse" data-testid="free-price">
                        FREE
                      </div>
                    </div>
                  </div>
                )}

                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-secondary border-2 border-neon-cyan p-3">
                    <div className="flex items-center gap-2 text-neon-cyan mb-1">
                      <Tag size={14} />
                      <span className="text-xs">TYPE</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-type">{giveaway.type}</div>
                  </div>
                  
                  <div className="bg-dark-secondary border-2 border-neon-pink p-3">
                    <div className="flex items-center gap-2 text-neon-pink mb-1">
                      <Users size={14} />
                      <span className="text-xs">USERS</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-users">{giveaway.users.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-dark-secondary border-2 border-neon-green p-3">
                    <div className="flex items-center gap-2 text-neon-green mb-1">
                      <Calendar size={14} />
                      <span className="text-xs">PUBLISHED</span>
                    </div>
                    <div className="text-white text-xs" data-testid="giveaway-published">
                      {formatDate(giveaway.published_date)}
                    </div>
                  </div>
                  
                  <div className="bg-dark-secondary border-2 border-neon-yellow p-3">
                    <div className="flex items-center gap-2 text-neon-yellow mb-1">
                      <span className="text-xs">PLATFORMS</span>
                    </div>
                    <div className="text-white text-xs" data-testid="giveaway-platforms">{giveaway.platforms}</div>
                  </div>
                </div>
                
                {giveaway.end_date && giveaway.end_date !== "N/A" && (
                  <div className="bg-game-red border-2 border-game-red p-3 mb-6">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <Calendar size={14} />
                      <span className="text-xs">EXPIRES</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-end-date">
                      {formatDate(giveaway.end_date)}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-neon-green text-lg mb-3">DESCRIPTION</h2>
                <p className="text-gray-300 text-sm leading-relaxed" data-testid="giveaway-description">
                  {giveaway.description}
                </p>
              </div>

              {/* Instructions */}
              {giveaway.instructions && (
                <div>
                  <h2 className="text-neon-purple text-lg mb-3">HOW TO CLAIM</h2>
                  <div className="bg-dark-secondary border-2 border-neon-purple p-4">
                    <p className="text-gray-300 text-sm leading-relaxed" data-testid="giveaway-instructions">
                      {giveaway.instructions}
                    </p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="bg-dark-tertiary border-2 border-neon-cyan p-4">
                <div className="flex items-center justify-between">
                  <span className="text-neon-cyan text-sm">STATUS</span>
                  <span 
                    className={`text-sm font-bold ${
                      giveaway.status === 'Active' ? 'text-neon-green' : 'text-game-red'
                    }`}
                    data-testid="giveaway-status"
                  >
                    {giveaway.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
