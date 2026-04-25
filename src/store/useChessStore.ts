import { create } from "zustand";
import type { ChessState } from "../types";

export const useChessStore = create<ChessState>((set) => ({
  // Stockfish enabled is default state
  isStockfishEnabled: true,
  // Flip the state
  toggleStockfish: () =>
    set((state) => ({ isStockfishEnabled: !state.isStockfishEnabled })),
}));
