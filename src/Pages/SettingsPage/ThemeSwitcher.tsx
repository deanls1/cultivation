import { Box, Button, Typography } from "@mui/material";
import { SettingsContext } from "GameEngine";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { theme, updateContext } = React.useContext(SettingsContext);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateContext({ theme: newTheme });
  };

  return (
    <Box>
      <Typography>{t("Theme")}</Typography>
      <Button variant="outlined" onClick={handleThemeChange}>
        {theme === "light" ? t("Light") : t("Dark")}
      </Button>
    </Box>
  );
}
