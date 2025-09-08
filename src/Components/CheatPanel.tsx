import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { PlayerContext } from "GameEngine";
import {
  CountableItems,
  InventoryCountableItem,
  InventoryItem,
  InventoryTreasure,
  UniqueItems,
} from "GameConstants/Interfaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { Herbs } from "GameConstants/Items/Herbs";
import { Minerals } from "GameConstants/Items/Minerals";
import Money from "GameConstants/Items/Money";
import Treasures from "GameConstants/Items/Treasures";
import { Treasure } from "GameConstants/Items/Treasures";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onClose: () => void;
};

const allItems = [
  ...Herbs.map((item) => ({ ...item, type: "herb" })),
  ...Minerals.map((item) => ({ ...item, type: "mineral" })),
  ...Money.map((item) => ({ ...item, type: "money" })),
  ...Treasures.map((item) => ({ ...item, type: "treasure" })),
];

export default function CheatPanel({ onClose }: Props) {
  const { t } = useTranslation();
  const player = React.useContext(PlayerContext);
  const { updateContext } = player;
  const [moneyAmount, setMoneyAmount] = React.useState(100);
  const [cultivationAmount, setCultivationAmount] = React.useState(100);
  const [selectedItem, setSelectedItem] = React.useState(allItems[0]);

  const addMoney = () => {
    const moneyItem = player.inventory.find(
      (item) => item.type === "money" && (item as InventoryCountableItem).name === "Copper Coin"
    ) as InventoryCountableItem | undefined;

    if (moneyItem) {
      moneyItem.amount += moneyAmount;
    } else {
      player.inventory.push({
        type: "money",
        id: uuidv4(),
        name: "Copper Coin",
        amount: moneyAmount,
      });
    }
    updateContext({ inventory: [...player.inventory] });
  };

  const addCultivation = () => {
    const equippedManual = player.manuals?.find((m) => m.isEquipped);
    if (equippedManual) {
      equippedManual.learningProgress.exp += cultivationAmount;
      updateContext({ manuals: [...(player.manuals || [])] });
    }
  };

  const addItem = () => {
    const item = selectedItem;
    if (CountableItems.includes(item.type as any)) {
      const existingItem = player.inventory.find(
        (i) => i.type === item.type && (i as InventoryCountableItem).name === item.name
      ) as InventoryCountableItem | undefined;
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        player.inventory.push({
          type: item.type as "herb" | "mineral" | "money",
          id: uuidv4(),
          name: item.name,
          amount: 1,
        });
      }
    } else if (UniqueItems.includes(item.type as any)) {
      player.inventory.push({
        type: item.type as "treasure" | "potion",
        id: uuidv4(),
        isLocked: false,
        isEquipped: false,
        item: item as Required<Treasure>,
      } as InventoryTreasure);
    }
    updateContext({ inventory: [...player.inventory] });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 2,
        zIndex: 1000,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{t("Cheat Panel")}</Typography>
        <Button onClick={onClose}>{t("Close")}</Button>
      </Box>
      <Box marginTop={2} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            type="number"
            value={moneyAmount}
            onChange={(e) => setMoneyAmount(parseInt(e.target.value, 10))}
            label={t("Add Money")}
          />
          <Button onClick={addMoney}>{t("Add")}</Button>
        </Box>
        <Box display="flex" gap={2}>
          <TextField
            type="number"
            value={cultivationAmount}
            onChange={(e) =>
              setCultivationAmount(parseInt(e.target.value, 10))
            }
            label={t("Add Cultivation")}
          />
          <Button onClick={addCultivation}>{t("Add")}</Button>
        </Box>
        <Box display="flex" gap={2}>
          <Select
            value={selectedItem.name}
            onChange={(e) =>
              setSelectedItem(
                allItems.find((item) => item.name === e.target.value)!
              )
            }
          >
            {allItems.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={addItem}>{t("Add Item")}</Button>
        </Box>
      </Box>
    </Paper>
  );
}
