import { useEffect, useState } from "react";

/**
 * Custom hook to handle the local countdown and formatting of a chess clock.
 * * @param initialSeconds The total seconds remaining, provided by the backend.
 * @param isActive Boolean indicating if this specific clock should be ticking down.
 * @returns An object containing the raw seconds and the formatted disply string.
 */
export function useChessClock(
  initialSeconds: number | null | undefined,
  isActive: boolean,
) {
  const [localSeconds, setLocalSeconds] = useState<number | null>(
    initialSeconds !== undefined ? initialSeconds : null,
  );
  const [prevInitialSeconds, setPrevInitialSeconds] = useState(initialSeconds);

  // Sync the local state whenever the backend pushes a new actual time
  // This corrects any minor drift between frontend and backend as well as extra time that may have been added
  if (initialSeconds !== prevInitialSeconds) {
    setPrevInitialSeconds(initialSeconds);
    if (initialSeconds !== undefined && initialSeconds !== null) {
      setLocalSeconds(initialSeconds);
    }
  }

  // Handle local countdown
  useEffect(() => {
    // Stop ticking if not its turn, or if time is up/missing
    if (!isActive || localSeconds === null || localSeconds <= 0) return;

    const intervalId = setInterval(() => {
      setLocalSeconds((prev) => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, localSeconds]);

  /**
   * Formats total seconds into standard chess clock formats:
   * Over 1 hour: "H:MM:SS"
   * Under 1 hour: "MM:SS"
   */
  const fomattedTime = (() => {
    if (localSeconds === null) return "--:--";

    const hours = Math.floor(localSeconds / 3600);
    const minutes = Math.floor((localSeconds % 3600) / 60);
    const seconds = localSeconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${paddedMinutes}:${paddedSeconds}`;
    }
    return `${paddedMinutes}:${paddedSeconds}`;
  })();

  return { localSeconds, fomattedTime };
}
