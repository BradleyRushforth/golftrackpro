import { createTheme } from "@mui/material/styles";
import "@fontsource-variable/inter";

const theme = createTheme({
  typography: {
    fontFamily: "Staatliches, Arial, sans-serif",
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "20px",
          fontFamily: '"Inter Variable", sans-serif',
          fontWeight: 500,
          lineHeight: "1.5",
          letterSpacing: "0.2px",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 600,
      lg: 1000,
      mLg: 1300,
      xl: 1600,
      xxl: 1920,
    },
  },
});

export default theme;
