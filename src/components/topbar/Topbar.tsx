import { Button, Tooltip, Typography } from "@mui/material";
import "./Topbar.css";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";

type TopbarProps = {
  title: string;
  route: string;
};

/**
 * Topbar which includes a button to go back to prev page, and a title of the page the user is on.
 * @param title The title of the page the user is currently on.
 * @returns A React component.
 */
export default function Topbar({ title, route }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <div className="topbar-container">
      <Button
        LinkComponent={Link}
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => navigate(route)}
        sx={{
          textWrap: "nowrap",
          minWidth: "10em",
        }}
      >
        Gå tilbake
      </Button>
      <Tooltip title={title}>
        <Typography
          variant="subtitle2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            textWrap: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Tooltip>
    </div>
  );
}
