import { Button, Tooltip, Typography } from "@mui/material";
import "./Topbar.css";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";

/**
 * Defines the properties for the {@link Topbar} component.
 */
type TopbarProps = {
  /** The title of the page to display in the top bar. */
  title: string;
  /** The route of where to navigate to when clicking on the 'Gå tilbake' button. */
  route: string;
};

/**
 * A UI top bar component that displays a button to navigate back to previous page,
 * and render a text for the title of the page the user is currently on.
 *
 * @example Usage of component:
 * ```ts
 * <Topbar
 *  title="Spillerprofil"
 *  route="/database"
 * />
 * ```
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
