import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GameContext } from "GameEngine";
import React from "react";
import { useTranslation } from "react-i18next";
import EnemyRow from "./FightingPage/EnemyRow";

export default function FightingPage() {
  const { enemies } = React.useContext(GameContext);
  const { t } = useTranslation();
  return (
    <Box marginTop={2} marginLeft={2}>
      <TableContainer sx={{ width: 800, height: 600, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("health")}</TableCell>
              <TableCell>{t("attack")}</TableCell>
              <TableCell>{t("defence")}</TableCell>
              <TableCell>{t("healthRegen")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enemies.map((enemy) => (
              <EnemyRow item={enemy} key={enemy.name} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
