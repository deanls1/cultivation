import { createTheme, responsiveFontSizes } from "@mui/material";

const LightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: "rgb(240, 240, 240)",
        paper: "rgb(240, 240, 240)",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  })
);

export default LightTheme;
