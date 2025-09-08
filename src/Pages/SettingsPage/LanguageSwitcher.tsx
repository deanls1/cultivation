import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box>
      <Typography>{t("Language")}</Typography>
      <Button
        variant={i18n.language === "en" ? "contained" : "outlined"}
        onClick={() => handleLanguageChange("en")}
        sx={{ marginRight: 1 }}
      >
        {t("English")}
      </Button>
      <Button
        variant={i18n.language === "zh" ? "contained" : "outlined"}
        onClick={() => handleLanguageChange("zh")}
      >
        {t("Chinese")}
      </Button>
    </Box>
  );
}
