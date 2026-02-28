import { useQuery } from "@tanstack/react-query";
import { fetchArchivedGameDetails } from "../api/database";

export default function useGame(gameId: string | undefined) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchArchivedGameDetails(gameId),
    enabled: !!gameId, // don't run query if we don't have an ID yet
    staleTime: Infinity, // archived games don't change so we can cache for a long time
  });
}
