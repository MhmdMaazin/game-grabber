export interface GiveawayStats {
  totalGiveaways: number;
  totalValue: number;
  platforms: number;
  newToday: number;
}

export interface FilterState {
  search: string;
  platform: string;
  type: string;
  sort: string;
}
