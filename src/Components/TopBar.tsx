import { Box, Paper, Typography, useTheme } from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React from "react";
import { getWindowDimensions } from "Utils/useWindowDimensions";
import { PlayerContext, GameContext, SettingsContext } from "GameEngine";
import { year, month } from "GameConstants/Constants";
import { useTranslation } from "react-i18next";
import CheatPanel from "./CheatPanel";

type Props = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

// Top bar with some game stats and values
export default function TopBar(props: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { stats, realm, state } = React.useContext(PlayerContext);
  const { cultivationRealms } = React.useContext(GameContext);
  const { gameSpeed } = React.useContext(SettingsContext);
  const [showCheatPanel, setShowCheatPanel] = React.useState(false);

  const { width } = getWindowDimensions();

  let playerAction = t(state.action);
  if (state.action === "activity")
    playerAction += " (" + t(state.activity?.name || "") + ")";
  if (state.action === "cultivating")
    playerAction += " (" + t(state.manual?.manual.name || "") + ")";
  if (state.action === "fighting")
    playerAction += " (" + t(state.enemy?.name || "") + ")";
  return (
    <>
      {showCheatPanel && <CheatPanel onClose={() => setShowCheatPanel(false)} />}
      <Paper elevation={8}>
        <Box
          height={theme.spacing(8)}
          width={width}
          display="flex"
          alignItems={"center"}
          gap={2}
          paddingX={2}
        >
          <Box>
            <Typography variant="h5">
              {t("Age")}: {parseAge(stats.age, t)}
            </Typography>
            <Typography variant="h5">
              {t("Realm")}: {cultivationRealms[realm.index].name}
            </Typography>
          </Box>

          <Box marginLeft="auto" display="flex" alignItems={"center"} gap={1}>
            <Box display="flex" flexDirection={"column"}>
              <Typography>
                {t("Game Speed")}: x{gameSpeed}
              </Typography>
              <Typography>{playerAction}</Typography>
            </Box>
            <Typography onClick={() => setShowCheatPanel(true)}>
              {t("Cheat Panel")}
            </Typography>
            <SettingsOutlinedIcon
              fontSize="large"
              onClick={() => props.setSettings((settings) => !settings)}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
function parseAge(time: number, t): string {
  const years = Math.floor(time / year);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((time - years * year) / month), 12);
  return `${years} ${t("years")} ${months} ${t("months")}`;
}
