import { Box, Typography } from "@mui/material";
import CropSquareImage from "Components/shared/CropImage";
import { PlayerContext, useNumberParser } from "GameEngine";
import { Activity } from "GameConstants/Activities";
import findItemDescription from "GameConstants/utils/findItemDescription";
import { quality } from "GameConstants/Activities/Crafting";
import power from "GameConstants/Activities/Crafting/power";
import { UniqueItems } from "GameConstants/Interfaces";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  activity: Activity;
};

// Generates item descriptions in the format Image Name Amount
export default function ResultItemDescription(props: Props) {
  const { skills } = React.useContext(PlayerContext);
  const { activity } = props;
  const { t } = useTranslation();
  const items = activity.result.items;
  if (!items) return <></>;
  const parse = useNumberParser();
  let result: JSX.Element[] = [];
  let i = 0;
  for (let item of items) {
    i++;
    const description = findItemDescription(item.name, item.type);
    if (!description) continue;
    const { path, sizeX: size, x, y } = description.image;
    let itemQuality, itemPower;
    if (UniqueItems.includes(item.type as any)) {
      itemQuality = quality(
        description.realmIndex,
        skills.crafting,
        activity.price?.priceMulti || 1
      );
      itemPower = power(itemQuality, description.realmIndex);
    }
    result.push(
      <Box display="flex" flexDirection={"column"} key={i}>
        <Box display="flex" alignItems={"center"} gap={1}>
          <CropSquareImage path={path} size={size} position={{ x, y }} />
          <Typography display="inline">
            {t(item.name)} {parse(item.amount)}
          </Typography>
        </Box>
        {UniqueItems.includes(item.type as any) ? (
          <Typography>
            {t("Quality")}: {parse(itemQuality)} {t("Power")}: {parse(itemPower)}
          </Typography>
        ) : (
          ""
        )}
      </Box>
    );
  }
  return <Box>{result.map((item) => item)}</Box>;
}
