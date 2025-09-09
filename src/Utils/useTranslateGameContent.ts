import { useTranslation } from "react-i18next";
import { GameContent } from "GameConstants/GameContent";
import { useCallback } from "react";

export const useTranslator = () => {
  const { t } = useTranslation();

  const translateData = useCallback((data: GameContent): GameContent => {
    const translateArray = (arr: any[]) => {
      if (!arr) return [];
      return arr.map((item) => {
        const newItem = { ...item };
        if (newItem.name) {
          newItem.name = t(newItem.name);
        }
        if (newItem.description) {
          newItem.description = t(newItem.description);
        }
        return newItem;
      });
    };

    // Deep copy to avoid modifying the original object from game constants
    const dataToTranslate = JSON.parse(JSON.stringify(data));

    return {
      ...dataToTranslate,
      trainings: translateArray(dataToTranslate.trainings),
      mining: translateArray(dataToTranslate.mining),
      crafting: translateArray(dataToTranslate.crafting),
      gathering: translateArray(dataToTranslate.gathering),
      cultivationRealms: translateArray(dataToTranslate.cultivationRealms),
      enemies: translateArray(dataToTranslate.enemies),
    };
  }, [t]);

  return translateData;
};
