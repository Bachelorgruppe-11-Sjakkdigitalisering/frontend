import { act, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useGameAnalysis } from "./useGameAnalysis";

describe("useGameAnalysis Hook", () => {
  it("should return default values when no PGN is given", () => {
    const { result } = renderHook(() => useGameAnalysis());

    expect(result.current.hasPgnError).toBe(false);
    expect(result.current.isExploring).toBe(false);
    expect(result.current.activeHistory).toEqual([]);
    expect(result.current.currentMoveIndex).toBe(0);
  });

  it("should correctly parse a valid PGN", () => {
    const validPgn = "1. e4 e5";
    const { result } = renderHook(() => useGameAnalysis(validPgn, false));

    expect(result.current.hasPgnError).toBe(false);
    expect(result.current.activeHistory.length).toBe(2); // e4 and e5
    expect(result.current.activeHistory[0].san).toBe("e4");
    expect(result.current.activeHistory[1].san).toBe("e5");
  });

  it("should catch errors in PGN without crashing", () => {
    const invalidPgn = "1. e4 e5 2. InvalidMove";
    const { result } = renderHook(() => useGameAnalysis(invalidPgn, false));

    expect(result.current.hasPgnError).toBe(true);
    expect(result.current.activeHistory).toEqual([]);
  });

  it("should change to exploring mode when a custom move is made", () => {
    const { result } = renderHook(() => useGameAnalysis("", false)); // Empty board

    act(() => {
      // Simulate moving pawn from e2 to e4
      result.current.handlePieceDrop({
        sourceSquare: "e2",
        targetSquare: "e4",
      } as Parameters<typeof result.current.handlePieceDrop>[0]);
    });

    expect(result.current.isExploring).toBe(true);
    expect(result.current.activeHistory.length).toBe(1);
    expect(result.current.activeHistory[0].san).toBe("e4");
  });

  it("should reset the exploring mode when going back to the game", () => {
    const { result } = renderHook(() => useGameAnalysis("1. d4", false));

    // Make a custom move first
    act(() => {
      result.current.handlePieceDrop({
        sourceSquare: "d7",
        targetSquare: "d5",
      } as Parameters<typeof result.current.handlePieceDrop>[0]);
    });
    expect(result.current.isExploring).toBe(true);
    expect(result.current.activeHistory.length).toBe(2);

    // Go back to real game
    act(() => {
      result.current.handleReturnToGame();
    });
    expect(result.current.isExploring).toBe(false);
    expect(result.current.currentMoveIndex).toBe(0);
    expect(result.current.activeHistory.length).toBe(1);
  });
});
