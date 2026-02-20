import {
  Avatar,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../main.css";
import { ArrowDropDown } from "@mui/icons-material";
import GameCard from "../components/game-card/GameCard";
import Topbar from "../components/topbar/Topbar";

export default function PlayerPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className={isDesktop ? "desktop-margins" : "mobile-margins"}>
      {/* top bar */}
      <Topbar title="Spillerprofil" route="/database" />

      {/* player name and avatar */}
      <div>
        <Avatar />
        <Typography variant="h3">Herman Lundby-Holen</Typography>
      </div>

      {/* filter dropdown button */}
      <ButtonGroup variant="contained" disableElevation>
        <Button>Filter</Button>
        <Button>
          <ArrowDropDown />
        </Button>
      </ButtonGroup>

      {/* game cards */}
      <div>
        <GameCard
          whiteName="Herman Lundby-Holen"
          blackName="Dennis Johansen"
          whiteWin={true}
          gameId="1"
        />
        <GameCard
          whiteName="Herman Lundby-Holen"
          blackName="Hans Olav Lahlum"
          whiteWin={false}
          gameId="2"
        />
        <GameCard
          whiteName="Herman Lundby-Holen"
          blackName="Dennis Johansen"
          whiteWin={true}
          gameId="1"
        />
        <GameCard
          whiteName="Herman Lundby-Holen"
          blackName="Dennis Johansen"
          whiteWin={true}
          gameId="1"
        />
      </div>
    </div>
  );
}
