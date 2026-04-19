export type GameResult = "1-0" | "0-1" | "1/2-1/2";

export interface ArchivedGame {
  id: number;
  date_played: string;
  result: GameResult;
  white_player_name: string;
  black_player_name: string;
  white_player_id: number;
  black_player_id: number;
  white_time: string;
  black_time: string;
  pgn: string;
}

export interface LiveGameState {
  board_id: number;
  white_player_name: string;
  black_player_name: string;
  white_player_id: number;
  black_player_id: number;
  pgn: string;
  fen: string;
  white_time: string;
  black_time: string;
  is_active: boolean;
}

export interface Player {
  id: number;
  name: string;
}

export interface PlayerStats {
  total_games: number;
  wins: number;
  draws: number;
  losses: number;
}
