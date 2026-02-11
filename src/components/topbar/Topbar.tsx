import { Button, Typography } from "@mui/material";
import "./Topbar.css";
import { ArrowBack } from "@mui/icons-material";

type TopbarProps = {
  title: string;
};

/**
 * Topbar which includes a button to go back to prev page, and a title of the page the user is on.
 * @param title The title of the page the user is currently on.
 * @returns A React component.
 */
export default function Topbar({ title }: TopbarProps) {
  return (
    <div className="topbar-container">
      <Button variant="contained" startIcon={<ArrowBack />}>
        Gå tilbake
      </Button>
      <Typography variant="subtitle2">{title}</Typography>
    </div>
  );
}
