import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../main.css";
import { ArrowDropDown, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import PlayerCard from "../components/player-card/PlayerCard";
import GameCard from "../components/game-card/GameCard";
import { useDatabase, type ArchivedGamesResponse } from "../hooks/useDatabase";
import { usePlayers, type PlayerResponse } from "../hooks/usePlayers";

export default function DatabasePage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [searchType, setSearchType] = useState("games");
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  // debounce effect to stop us from sending api request after every key stroke from user
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue);
    }, 300); // waits 300ms after last keystroke before updating the value of search

    return () => {
      clearTimeout(handler); // clears the timer if they type again before 300ms
    };
  }, [inputValue]);

  // call api hook to fetch archived games and players
  const {
    data: archivedGames,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useDatabase(query);
  const {
    data: players,
    isLoading: playersLoading,
    isError: playersError,
  } = usePlayers(query);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchType: string,
  ) => {
    setSearchType(newSearchType);
  };

  // determine which loading/error state to show based on the active tab
  const isLoading = searchType === "games" ? gamesLoading : playersLoading;
  const isError = searchType === "games" ? gamesError : playersError;

  return (
    <div
      className={isDesktop ? "desktop-margins" : "mobile-margins"}
      style={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        gap: "0.5em",
        maxWidth: "800px",
      }}
    >
      {/* search field */}
      <TextField
        variant="outlined"
        placeholder="Søk etter spillernavn..."
        type="search"
        aria-label="Søkefelt"
        fullWidth
        onChange={(e) => setInputValue(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "100px",
          },
        }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {/* show a spinner while fetching */}
                {isLoading ? <CircularProgress /> : <Search />}
              </InputAdornment>
            ),
          },
        }}
      />

      <div
        style={
          isDesktop
            ? { display: "flex", justifyContent: "space-between", gap: "0.5em" }
            : { display: "flex", flexDirection: "column", gap: "0.5em" }
        }
      >
        {/* search type button group */}
        <ToggleButtonGroup
          color="primary"
          aria-label="Type søk"
          value={searchType}
          exclusive
          onChange={handleChange}
          fullWidth={true}
        >
          <ToggleButton
            value="games"
            sx={{
              borderRadius: 100,
            }}
          >
            Partisøk
          </ToggleButton>
          <ToggleButton
            value="players"
            sx={{
              borderRadius: 100,
            }}
          >
            Spillersøk
          </ToggleButton>
        </ToggleButtonGroup>

        {/* filter dropdown button */}
        <ButtonGroup variant="contained" disableElevation>
          <Button>Filter</Button>
          <Button>
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
      </div>

      {/* result text */}
      <Typography variant="subtitle1">
        {query
          ? `Resultater for "${query}"`
          : !query && searchType === "games"
            ? "Viser alle tidligere spilte partier"
            : "Viser alle spillere"}
      </Typography>

      {/* error state */}
      {isError && <Alert severity="error">Kunne ikke hente partier.</Alert>}

      {/* result cards */}
      {searchType === "players" ? (
        <>
          {players?.length === 0 && (
            <Typography variant="body2">Ingen spillere funnet.</Typography>
          )}
          {players?.map((player: PlayerResponse) => (
            <PlayerCard
              key={player.id}
              name={player.name}
              playerId={player.id.toString()}
            />
          ))}
        </>
      ) : searchType === "games" ? (
        <>
          {archivedGames?.length === 0 && (
            <Typography variant="body2">Ingen partier funnet.</Typography>
          )}

          {archivedGames?.map((game: ArchivedGamesResponse) => (
            <GameCard
              key={game.id}
              whiteName={game.white_player_name}
              blackName={game.black_player_name}
              result={game.result}
              gameId={game.id.toString()}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
