import { Button, Typography } from "@mui/material";
import "./Topbar.css";
import { ArrowBack } from "@mui/icons-material";

type TopbarProps = {
  title: string;
};

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
