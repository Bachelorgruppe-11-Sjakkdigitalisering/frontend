/**
 * Posts a new request to chess/stockfish api to retrieve the evaluation of a chess position given by the `fen`.
 *
 * @param fen The standard Forsynth-Edwards Notation string representing the current board state.
 * @returns A promise returning the stockfish data of the current position.
 * @throws {Error} Throws an error if the stockfish api returns a non-2xx status code.
 */
export default async function fetchEvaluation(fen: string) {
  const response = await fetch("https://chess-api.com/v1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen }),
  });

  if (!response.ok) {
    throw new Error(`Stockfish response was not ok: ${response.statusText}`);
  }

  return response.json();
}
