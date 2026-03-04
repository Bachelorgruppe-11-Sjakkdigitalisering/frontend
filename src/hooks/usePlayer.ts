import { useQuery } from "@tanstack/react-query";
import { fetchPlayerGames, fetchPlayerProfile } from "../api/playerProfile";

export function usePlayerProfile(playerId: string | undefined) {
  return useQuery({
    queryKey: ["playerProfile", playerId],
    queryFn: () => fetchPlayerProfile(playerId!),
    enabled: !!playerId, // only run if we actually have an id
  });
}

export function usePlayerGames(playerId: string | undefined) {
  return useQuery({
    queryKey: ["playerGames", playerId],
    queryFn: () => fetchPlayerGames(playerId!),
    enabled: !!playerId,
  });
}
