"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/8bit/button";
import { Frame } from "@/components/ui/8bit/frame";
import { ArrowLeft, ExternalLink, Calendar, Users, Tag } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Giveaway } from "@shared/schema";

export default function GiveawayDetails() {
  const params = useParams<{ id: string }>();
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
            <Button 
              className="flex items-center gap-2 bg-dark-secondary text-white hover:bg-gray-700"
              data-testid="button-back"
            >
              <ArrowLeft size={16} />
              BACK TO GIVEAWAYS
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12" data-testid="loading-state">
            <div className="inline-block w-16 h-16 border-4 border-gray-600 border-t-transparent animate-spin"></div>
            <p className="text-white mt-4">LOADING GIVEAWAY...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12" data-testid="error-state">
            <div className="text-red-500 text-lg mb-4">⚠️ ERROR</div>
            <p className="text-white">Failed to load giveaway details.</p>
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
              <Frame className="bg-black">
                <div className="relative">
                  <img 
                    src={giveaway.image || giveaway.thumbnail}
                    alt={giveaway.title}
                    className="w-full rounded-none"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=No+Image';
                    }}
                    data-testid="giveaway-image"
                  />
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
                      <div className="bg-gray-600 text-white px-3 py-2 text-sm line-through">
                        {giveaway.worth}
                      </div>
                    )}
                    <div className="bg-green-500 text-white px-3 py-2 text-lg font-bold">
                      FREE
                    </div>
                  </div>
                </div>
              </Frame>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={handleClaimClick}
                  className="flex-1 bg-gray-700 text-white hover:bg-gray-600 text-sm py-3"
                  data-testid="button-claim-main"
                >
                  <ExternalLink size={16} className="mr-2" />
                  {giveaway.type.toLowerCase() === 'beta' ? 'JOIN BETA' : 'CLAIM NOW'}
                </Button>
                
                {giveaway.gamerpower_url && (
                  <Button
                    onClick={() => window.open(giveaway.gamerpower_url, '_blank', 'noopener,noreferrer')}
                    className="text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white text-sm py-3"
                    data-testid="button-view-more"
                  >
                    VIEW MORE
                  </Button>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl text-white mb-4" data-testid="giveaway-title">
                  {giveaway.title}
                </h1>
                
                {/* Price Section */}
                {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
                  <Frame className="bg-dark-secondary p-4 mb-6 text-center">
                    <div className="text-gray-300 text-xs mb-2">ORIGINAL PRICE</div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-gray-400 text-xl line-through" data-testid="original-price">
                        {giveaway.worth}
                      </div>
                      <div className="text-green-500 text-2xl font-bold" data-testid="free-price">
                        FREE
                      </div>
                    </div>
                  </Frame>
                )}

                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Frame className="bg-dark-secondary p-3">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <Tag size={14} />
                      <span className="text-xs">TYPE</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-type">{giveaway.type}</div>
                  </Frame>
                  
                  <Frame className="bg-dark-secondary p-3">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <Users size={14} />
                      <span className="text-xs">USERS</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-users">{giveaway.users.toLocaleString()}</div>
                  </Frame>
                  
                  <Frame className="bg-dark-secondary p-3">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <Calendar size={14} />
                      <span className="text-xs">PUBLISHED</span>
                    </div>
                    <div className="text-white text-xs" data-testid="giveaway-published">
                      {formatDate(giveaway.published_date)}
                    </div>
                  </Frame>
                  
                  <Frame className="bg-dark-secondary p-3">
                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                      <span className="text-xs">PLATFORMS</span>
                    </div>
                    <div className="text-white text-xs" data-testid="giveaway-platforms">{giveaway.platforms}</div>
                  </Frame>
                </div>
                
                {giveaway.end_date && giveaway.end_date !== "N/A" && (
                  <Frame className="bg-red-900 p-3 mb-6">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <Calendar size={14} />
                      <span className="text-xs">EXPIRES</span>
                    </div>
                    <div className="text-white text-sm" data-testid="giveaway-end-date">
                      {formatDate(giveaway.end_date)}
                    </div>
                  </Frame>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-white text-lg mb-3">DESCRIPTION</h2>
                <Frame className="bg-dark-secondary p-4">
                  <p className="text-gray-300 text-sm leading-relaxed" data-testid="giveaway-description">
                    {giveaway.description}
                  </p>
                </Frame>
              </div>

              {/* Instructions */}
              {giveaway.instructions && (
                <div>
                  <h2 className="text-white text-lg mb-3">HOW TO CLAIM</h2>
                  <Frame className="bg-dark-secondary p-4">
                    <p className="text-gray-300 text-sm leading-relaxed" data-testid="giveaway-instructions">
                      {giveaway.instructions}
                    </p>
                  </Frame>
                </div>
              )}

              {/* Status */}
              <Frame className="bg-dark-secondary p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">STATUS</span>
                  <span 
                    className={`text-sm font-bold ${
                      giveaway.status === 'Active' ? 'text-green-500' : 'text-red-500'
                    }`}
                    data-testid="giveaway-status"
                  >
                    {giveaway.status.toUpperCase()}
                  </span>
                </div>
              </Frame>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
