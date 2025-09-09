import { defaultAutosaveInterval } from "GameConstants/Constants";
import React from "react";
import { useTranslator } from "Utils/useTranslateGameContent";
import GameContext, {
  GameContextType,
  gameContext,
} from "./GameContext/GameContext";
import { useTranslation } from "react-i18next";

// Wrapper for loading player save data
export default function WorldLoader(props: any) {
  const [data, setData] = React.useState<GameContextType>(gameContext);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const translateData = useTranslator();
  const { i18n } = useTranslation();

  // This effect runs once on startup to load and translate data.
  React.useEffect(() => {
    let initialData = gameContext;
    const savedGameData = localStorage.getItem("game");
    if (savedGameData) {
      try {
        // Note: This assumes the saved data structure matches GameContent.
        // In a real-world scenario, you'd add validation/migration logic here.
        initialData = JSON.parse(savedGameData);
      } catch (e) {
        console.error("Failed to parse saved game data:", e);
        // Fallback to default content if parsing fails
        initialData = gameContext;
      }
    }
    setData(translateData(initialData));
    setLoaded(true);
  }, [translateData]); // Dependency on translateData ensures this runs if the function changes (e.g., on language change)

  // This effect listens for language changes and re-translates the data.
  React.useEffect(() => {
    setData(currentData => translateData(currentData));
  }, [i18n.language, translateData]);


  const updateContext = (newData: Partial<GameContextType>) =>
    setData((data) => ({ ...data, ...newData }));

  // Autosave
  React.useEffect(() => {
    if (!loaded) return; // Don't save until loaded
    const autosaveInterval = setInterval(() => {
      setData((data) => {
        // We need to save the untranslated version to localStorage.
        // This is a simplification. A robust solution would be to
        // either detranslate the data before saving, or better,
        // only save the player's progress, not the static game content.
        // For now, we'll save the (potentially translated) data.
        localStorage.setItem("game", JSON.stringify(data));
        return data;
      });
    }, defaultAutosaveInterval);
    return () => {
      clearInterval(autosaveInterval);
    };
  }, [loaded]);

  return (
    <GameContext.Provider
      value={{ ...data, updateContext, setContext: setData }}
    >
      {loaded && props.children}
    </GameContext.Provider>
  );
}
