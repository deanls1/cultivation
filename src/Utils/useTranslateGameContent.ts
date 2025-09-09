import { useTranslation } from "react-i18next";
import { GameContent, gameContent } from "GameConstants/GameContent";

export const useTranslateGameContent = (): GameContent => {
  const { t } = useTranslation();

  const translateArray = (arr: any[]) => {
    return arr.map((item) => {
      if (item.name) {
        item.name = t(item.name);
      }
      if (item.description) {
        item.description = t(item.description);
      }
      return item;
    });
  };

  const translatedContent: GameContent = {
    ...gameContent,
    trainings: translateArray([...gameContent.trainings]),
    mining: translateArray([...gameContent.mining]),
    crafting: translateArray([...gameContent.crafting]),
    gathering: translateArray([...gameContent.gathering]),
    cultivationRealms: translateArray([...gameContent.cultivationRealms]),
    enemies: translateArray([...gameContent.enemies]),
  };

  return translatedContent;
};
