import { createTheme, responsiveFontSizes } from "@mui/material";

const DarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: "rgb(30, 30, 30)",
        paper: "rgb(30, 30, 30)",
      },
    },
  })
);

export default DarkTheme;
