import {
  Avatar,
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
    <div className={isDesktop ? "desktop-margins" : "mobile-margins"}>
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
      >
        <ToggleButton value="games">Partisøk</ToggleButton>
        <ToggleButton value="player">Spillersøk</ToggleButton>
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

      {/* result card */}
      <div>
        <Avatar />
        <Typography variant="body1">Resultat...</Typography>
      </div>
    </div>
  );
}
