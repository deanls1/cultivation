import { Box, Typography, useTheme } from "@mui/material";
import { PlayerContext, useNumberParser, getStatName } from "GameEngine";
import React from "react";
import { useTranslation } from "react-i18next";
import StatDetailsTooltip from "../PlayerStatsPane/StatDetailsTooltip";

// Player baseStats display
export default function Stats() {
  const { baseStats } = React.useContext(PlayerContext);
  const parse = useNumberParser();
  const theme = useTheme();
  const { t } = useTranslation();

  let description: Array<JSX.Element> = [];
  for (const [key, value] of Object.entries(baseStats)) {
    description.push(
      <StatDetailsTooltip stat={key} key={key}>
        <Typography key={key}>
          {t(getStatName(key))}: {parse(value)}
        </Typography>
      </StatDetailsTooltip>
    );
  }

  return (
    <Box paddingTop={theme.spacing(1)} paddingLeft={theme.spacing(1)}>
      <Typography>{t("Base stats")}</Typography>
      {description}
    </Box>
  );
}
