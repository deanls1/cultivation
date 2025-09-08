import { Box } from "@mui/material";
import PlayerStatsPane from "./LeftSideBar/PlayerStatsPane";
import PlayerLocationPane from "./LeftSideBar/PlayerLocationPane";
import PlayerStatsLayout from "./LeftSideBar/PlayerStatsLayout";
import { useTranslation } from "react-i18next";

export default function LeftSideBar() {
  const { t } = useTranslation();
  return (
    <Box borderRight={"1px solid gray"}>
      <PlayerStatsPane
        displayStats={[
          { name: t("Health Regen"), stat: "healthRegen" },
          { name: t("Attack"), stat: "attack" },
          { name: t("Defence"), stat: "defence" },
          { name: t("Insight"), stat: "insight" },
        ]}
      />
      <PlayerStatsLayout />
      <PlayerLocationPane />
    </Box>
  );
}
