import { Box, Typography, useTheme } from "@mui/material";
import getSpacing from "Utils/getSpacing";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import ActiveManual from "./CultivationPage/ActiveManual";
import EquippedManuals from "./CultivationPage/EquippedManuals";
import ManualsList from "./CultivationPage/ManualsList";
import { useTranslation } from "react-i18next";

export default function ManualsPage() {
  const theme = useTheme();
  const { height } = getWindowDimensions();
  const { t } = useTranslation();
  return (
    <Box
      marginLeft={theme.spacing(2)}
      marginTop={theme.spacing(2)}
      height={height - getSpacing(theme, 20)}
      overflow="auto"
    >
      <Typography variant="h5" marginBottom={theme.spacing(2)}>
        {t("Studying Manual")}
      </Typography>
      <ActiveManual />
      <EquippedManuals />
      <ManualsList />
    </Box>
  );
}
