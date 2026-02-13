import { useQuery } from "@tanstack/react-query";
import fetchEvaluation from "../api/stockfish";

export function useStockfish(fen: string) {
  return useQuery({
    queryKey: ["stockfish", fen], // this makes it so we automatically refetch whenever fen changes
    queryFn: () => fetchEvaluation(fen),
    enabled: !!fen, // only fetch if there is a fen!
    staleTime: Infinity, // the eval for a specific position never "expires",
    placeholderData: (previousData) => previousData, // keeps previous data while fetching new data to prevent UI flickering
  });
}
