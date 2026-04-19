import type { Player, PlayerStats } from "./models";

export interface PlayerProfileResponse {
  player: Player;
  stats: PlayerStats;
}

export interface StockfishResponse {
  eval: number;
  winChance: number;
  san: string;
  move: string;
  continuationArr: string[];
  mate: number | null;
  error: string;
}
