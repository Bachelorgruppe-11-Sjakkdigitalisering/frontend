import { useQuery } from "@tanstack/react-query";
import { fetchAllLiveGames } from "../api/game";

export default function useAllLiveGames() {
  return useQuery({
    queryKey: ["allLiveGames"],
    queryFn: () => fetchAllLiveGames,
  });
}
