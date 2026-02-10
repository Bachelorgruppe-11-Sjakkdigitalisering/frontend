import { createTheme } from "@mui/material/styles";

// extends the mui 'TypeBackground' to include custom 'nav' element
declare module "@mui/material/styles" {
  interface TypeBackground {
    nav: string;
  }
}

export const appTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FF",
      nav: "#1D2024",
    },
    text: {
      primary: "#1D1B20",
      secondary: "#F8F9FF",
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.nav,
        }),
      },
    },
  },
});
