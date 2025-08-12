"use client";
import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";
import { Frame } from "@/components/ui/8bit/frame";
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
      case "loot":
        return "border-gray-600";
      case "beta":
        return "border-gray-600";
      default:
        return "border-gray-600";
    }
  };

  const getButtonColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "loot":
        return "bg-gray-700 text-white hover:bg-gray-600";
      case "beta":
        return "bg-gray-700 text-white hover:bg-gray-600";
      default:
        return "bg-gray-700 text-white hover:bg-gray-600";
    }
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes("steam")) return "bg-gray-600 text-white";
    if (platformLower.includes("epic")) return "bg-gray-600 text-white";
    if (platformLower.includes("gog")) return "bg-gray-600 text-white";
    return "bg-gray-600 text-white";
  };

  const handleClaimClick = () => {
    if (giveaway.open_giveaway_url) {
      window.open(giveaway.open_giveaway_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Frame className="group cursor-pointer h-full">
      <div className="bg-dark-secondary h-full flex flex-col">
        <Link href={`/giveaway/${giveaway.id}`} className="block flex-1 flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={giveaway.image || giveaway.thumbnail}
            alt={giveaway.title}
            className="w-full h-full object-contain bg-gray-900 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=No+Image";
            }}
          />
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            {giveaway.worth !== "N/A" && giveaway.worth !== "$0.00" && (
              <div className="bg-gray-600 text-white px-2 py-1 text-xs line-through">
                {giveaway.worth}
              </div>
            )}
            <div className="bg-green-500 text-white px-2 py-1 text-xs font-bold">
              FREE
            </div>
          </div>
          <div
            className={`absolute top-2 left-2 px-2 py-1 text-xs ${getPlatformColor(giveaway.platforms)}`}
          >
            {giveaway.platforms.split(",")[0].trim().toUpperCase()}
          </div>
        </div>

        <div className="p-4 pb-2">
          <h3
            className="text-white text-sm mb-2 truncate hover:text-gray-300 transition-colors"
            data-testid={`title-${giveaway.id}`}
          >
            {giveaway.title}
          </h3>
          <p
            className="text-red-400 text-xs mb-3 line-clamp-2"
            data-testid={`description-${giveaway.id}`}
          >
            {giveaway.description}
          </p>

          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-gray-300" data-testid={`type-${giveaway.id}`}>
              {giveaway.type}
            </span>
            <span
              className="text-red-400"
              data-testid={`end-date-${giveaway.id}`}
            >
              {formatEndDate(giveaway.end_date)}
            </span>
          </div>
        </div>
        </Link>

        {/* Claim button positioned normally but with event handling to prevent card navigation */}
        <div className="px-4 pb-4 mt-auto">
          <Button
            className={`w-full py-2 px-4 transition-colors retro-button text-xs ${getButtonColor(giveaway.type)}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClaimClick();
            }}
            data-testid={`button-claim-${giveaway.id}`}
          >
            {giveaway.type.toLowerCase() === "beta" ? "JOIN BETA" : "CLAIM NOW"}
          </Button>
        </div>
      </div>
    </Frame>
  );
}
