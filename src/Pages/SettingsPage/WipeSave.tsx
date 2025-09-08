import { Button } from "@mui/material";
import { gameContent } from "GameConstants/GameContent";
import { PlayerContext, GameContext } from "GameEngine";
import { playerContext } from "GameEngine/Player/PlayerContext";
import React from "react";
import { useTranslation } from "react-i18next";

export default function WipeSave() {
  const { setContext: setPlayer } = React.useContext(PlayerContext);
  const { setContext: setGame } = React.useContext(GameContext);
  const { t } = useTranslation();

  const handleClick = () => {
    setPlayer(playerContext);
    setGame(gameContent);
    localStorage.removeItem("player");
    localStorage.removeItem("game");
  };

  return (
    <Button variant="outlined" color="error" onClick={handleClick}>
      {t("Wipe Save")}
    </Button>
  );
}
