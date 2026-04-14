# Frontend for Digitalisering av Sjakkparti

## Oversikt

Dette repositoryet inneholder frontend-koden for en plattform for visning og analyse av sjakk, utviklet som en del av et bachelorprosjekt. Applikasjonen tilbyr et interaktivt og responsivt brukergrensesnitt for å se direkteoverførte sjakkpartier, søke i historiske databaser, se detaljert spillerstatistikk og analysere brettstillinger ved hjelp av Stockfish.

## Nøkkelfunksjoner

- **Strømming av live-partier:** Sanntidsoppdatering (polling) og synkronisering av pågående sjakkpartier ved bruk av `@tanstack/react-query`.
- **Søk i historisk database:** Debouncet søkefunksjonalitet for å finne historiske partier og spesifikke spillerprofiler uten å overbelaste API-et.
- **Interaktivt analysebrett:** Brukere kan dra og slippe brikker for å utforske egne varianter ("Hva hvis"-scenarioer) som forgrener seg fra offisielle partier, drevet av `chess.js`.
- **Motor-evaluering:** Sanntidsevaluering av stillingen via en integrasjon med Stockfish API, visualisert med en dynamisk evalueringsbar.
- **Komponentdrevet UI:** Et responsivt og tilgjengelig grensesnitt bygget med Material-UI (MUI), grundig dokumentert og testet via Storybook.
- **Robust tilstandshåndtering (State Management):** Sentralisert caching, polling og bakgrunnsoppdateringer håndtert av TanStack Query.

## Teknologistakk

- **Kjerne:** React 18, TypeScript, Vite
- **Tilstandshåndtering og datahenting:** TanStack Query (React Query)
- **Ruting:** React Router v6
- **UI-rammeverk:** Material-UI (MUI)
- **Sjakklogikk og UI:** `chess.js`, `react-chessboard`
- **Testing og dokumentasjon:** Storybook, MSW (Mock Service Worker)

## Kom i gang

### Forutsetninger

Sørg for at du har følgende installert på din lokale maskin:

- Node.js (v18 eller nyere anbefales)
- npm eller yarn

### Installasjon

1. Klon repositoryet:
   ```bash
   git clone https://github.com/Bachelorgruppe-11-Sjakkdigitalisering/frontend.git
   cd frontend
   ```
2. Installer avhengigheter:
   ```bash
   npm install
   ```

  <!-- TODO: Sette opp miljøvariabler! -->
  <!-- 3. Sett opp miljøvariabler (opprett en \`.env\`-fil i rotkatalogen):
    ```env
    VITE_API_BASE_URL=http://127.0.0.1:8000
    ``` -->

### Kjøring av applikasjonen

For å starte utviklingsserveren:

```bash
npm run dev
```

Applikasjonen vil nå være tilgjengelig på `http://localhost:5173`.

## Testing og Storybook

Dette prosjektet benytter **Storybook** for isolering og dokumentasjon av UI-komponenter, kombinert med **MSW (Mock Service Worker)** for å simulere API-responser fra backend. Dette sikrer deterministiske testtilstander for lasting, feilhåndtering og 'edge-cases' (som sjakkmatt eller patt).

For å starte Storybook-miljøet:

```bash
npm run storybook
```

## Prosjektstruktur

- `/src/api` - Nettverksfunksjoner som pakker inn backend-endepunktene.
- `/src/components` - Gjenbrukbare, isolerte UI-komponenter (f.eks. `Evalbar`, `GameCard`, `MoveList`).
- `/src/hooks` - Egendefinerte React Query-hooks (`useDatabase`, `useStockfish`, `useLiveGame`) som håndterer caching og forretningslogikk.
- `/src/pages` - Sidene til applikasjonen (`HomePage`, `GameDetailsPage`, `PlayerPage`).

## Backend-integrasjon

Denne frontenden er designet for å hente data fra et RESTful API. De viktigste endepunktene inkluderer:

- `/api/games` - Henter aktive live-partier.
- `/api/archive/*` - Søker i historiske partier.
- `/api/players/*` - Henter spillerprofiler og statistikk.
- `/api/chess` - POST-endepunkt for å hente Stockfish-evalueringer basert på FEN-strenger.

## Akademisk kontekst

Dette prosjektet ble utviklet av Herman Lundby-Holen og Dennis Johansen som en del av bacheloroppgaven ved NTNU i Ålesund, 2026, med Aalesund Schacklag som oppdragsgiver.
