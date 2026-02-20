import {
  Button,
  ButtonGroup,
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
import { useState } from "react";
import PlayerCard from "../components/player-card/PlayerCard";
import GameCard from "../components/game-card/GameCard";

export default function DatabasePage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [searchType, setSearchType] = useState("games");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchType: string,
  ) => {
    setSearchType(newSearchType);
  };

  return (
    <div
      className={isDesktop ? "desktop-margins" : "mobile-margins"}
      style={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        gap: "0.5em",
        maxWidth: "540px",
      }}
    >
      {/* search field */}
      <TextField
        variant="outlined"
        label="Søk..."
        placeholder="Søk..."
        type="search"
        aria-label="Søkefelt"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* search type button group */}
      <ToggleButtonGroup
        color="primary"
        aria-label="Type søk"
        value={searchType}
        exclusive
        onChange={handleChange}
        fullWidth={isDesktop ? false : true}
      >
        <ToggleButton value="games">Partisøk</ToggleButton>
        <ToggleButton value="players">Spillersøk</ToggleButton>
      </ToggleButtonGroup>

      {/* filter dropdown button */}
      <ButtonGroup variant="contained" disableElevation>
        <Button>Filter</Button>
        <Button>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>

      {/* result text */}
      <Typography variant="subtitle1">Resultater for ...</Typography>

      {/* result cards */}
      {searchType === "players" ? (
        <PlayerCard name="Herman Lundby-Holen" playerId="1" />
      ) : searchType === "games" ? (
        <>
          <GameCard
            whiteName="Herman Lundby-Holen"
            blackName="Dennis Johansen"
            whiteWin={true}
            gameId="1"
          />
          <GameCard
            whiteName="Herman Lundby-Holen"
            blackName="Dennis Johansen"
            whiteWin={false}
            gameId="2"
          />
        </>
      ) : null}
    </div>
  );
}
