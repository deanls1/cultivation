import { defaultAutosaveInterval } from "GameConstants/Constants";
import React from "react";
import { useTranslateGameContent } from "Utils/useTranslateGameContent";
import GameContext, {
  GameContextType,
  gameContext,
} from "./GameContext/GameContext";

// Wrapper for loading player save data
export default function WorldLoader(props: any) {
  const translatedGameContent = useTranslateGameContent();
  const [data, setData] = React.useState(translatedGameContent);

  const updateContext = (newData: Partial<GameContextType>) =>
    setData((data) => ({ ...data, ...newData }));
  // Load save data from Local Storage
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    const gameData = localStorage.getItem("game");
    if (gameData) {
      let storageData = JSON.parse(gameData);
      setData(storageData);
    }

    setLoaded(true);
  }, []);
  // Autosave
  React.useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Thats a hacky way to access current state value inside useEffect run only once
      setData((data) => {
        localStorage.setItem("game", JSON.stringify(data));
        return data;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{ ...data, updateContext, setContext: setData }}
    >
      {loaded && props.children}
    </GameContext.Provider>
  );
}
