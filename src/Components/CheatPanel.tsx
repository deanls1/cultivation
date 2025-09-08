import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { GameContext, PlayerContext } from "GameEngine";
import {
  CountableItems,
  InventoryItem,
  UniqueItems,
} from "GameConstants/Interfaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { Herbs } from "GameConstants/Items/Herbs";
import { Minerals } from "GameConstants/Items/Minerals";
import Money from "GameConstants/Items/Money";
import Treasures from "GameConstants/Items/Treasures";
import { Treasure } from "GameConstants/Items/Treasures";

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
      (item) => item.type === "money" && item.name === "Copper Coin"
    );
    if (moneyItem) {
      moneyItem.amount += moneyAmount;
    } else {
      player.inventory.push({
        type: "money",
        name: "Copper Coin",
        amount: moneyAmount,
      });
    }
    updateContext({ inventory: [...player.inventory] });
  };

  const addCultivation = () => {
    updateContext({
      realm: {
        ...player.realm,
        exp: player.realm.exp + cultivationAmount,
      },
    });
  };

  const addItem = () => {
    const item = selectedItem;
    if (CountableItems.includes(item.type as any)) {
      const existingItem = player.inventory.find(
        (i) => i.name === item.name && i.type === item.type
      );
      if (existingItem) {
        (existingItem as any).amount += 1;
      } else {
        player.inventory.push({
          type: item.type,
          name: item.name,
          amount: 1,
        } as InventoryItem);
      }
    } else if (UniqueItems.includes(item.type as any)) {
      player.inventory.push({
        type: item.type,
        name: item.name,
        isLocked: false,
        isEquipped: false,
        item: item as Treasure,
      } as InventoryItem);
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
