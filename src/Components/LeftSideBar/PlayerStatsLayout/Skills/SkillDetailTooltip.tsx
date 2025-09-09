import { TooltipProps, Typography, useTheme } from "@mui/material";
import HtmlTooltip from "Components/shared/HtmlTooltip";
import { PlayerContext, getSkillStructure, useNumberParser } from "GameEngine";
import React from "react";
import { useTranslation } from "react-i18next";

// Provides description
export default function SkillDetailsTooltip(
  props: Omit<TooltipProps, "title"> & { skill: string }
) {
  const player = React.useContext(PlayerContext);
  const skillStructure = getSkillStructure(props.skill, player);
  const parse = useNumberParser();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">{t("Character")} {t(props.skill)}</Typography>
          <Typography>
            {t("Base")} {t(props.skill)}: {parse(skillStructure.base)}
          </Typography>

          <Typography>
            {t("Manuals multi")}:
            <Typography
              component="span"
              color={
                skillStructure.manuals >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(skillStructure.manuals)}
            </Typography>
          </Typography>
          <Typography>
            {t("Treasures Multi")}:
            <Typography
              component="span"
              color={
                skillStructure.treasuresMulti >= 1
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              x{parse(skillStructure.treasuresMulti)}
            </Typography>
          </Typography>
          <Typography>
            {t("Treasures bonus")}:
            <Typography
              component="span"
              color={
                skillStructure.treasures >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              display="inline"
            >
              {" "}
              +{parse(skillStructure.treasures)}
            </Typography>
          </Typography>
        </>
      }
    >
      {props.children}
    </HtmlTooltip>
  );
}
