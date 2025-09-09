import { useTranslation } from "react-i18next";
import { GameContent } from "GameConstants/GameContent";
import { useCallback } from "react";

// 检测字符串是否包含中文字符
const containsChinese = (text: string): boolean => {
  return /[\u4e00-\u9fa5]/.test(text);
};

export const useTranslator = () => {
  const { t, i18n } = useTranslation();

  const translateData = useCallback((data: GameContent): GameContent => {
    const translateArray = (arr: any[]) => {
      if (!arr) return [];
      return arr.map((item) => {
        const newItem = { ...item };
        if (newItem.name) {
          // 如果当前语言是中文且内容已经是中文，或者当前语言是英文且内容是英文，则不翻译
          const isCurrentlyChinese = i18n.language === 'zh';
          const nameIsChinese = containsChinese(newItem.name);
          
          if (isCurrentlyChinese && nameIsChinese) {
            // 当前是中文环境且内容已经是中文，不需要翻译
          } else if (!isCurrentlyChinese && !nameIsChinese) {
            // 当前是英文环境且内容已经是英文，不需要翻译
          } else {
            // 需要翻译的情况
            newItem.name = t(newItem.name);
          }
        }
        if (newItem.description) {
          const isCurrentlyChinese = i18n.language === 'zh';
          const descIsChinese = containsChinese(newItem.description);
          
          if (isCurrentlyChinese && descIsChinese) {
            // 当前是中文环境且内容已经是中文，不需要翻译
          } else if (!isCurrentlyChinese && !descIsChinese) {
            // 当前是英文环境且内容已经是英文，不需要翻译
          } else {
            // 需要翻译的情况
            newItem.description = t(newItem.description);
          }
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
  }, [t, i18n.language]);

  return translateData;
};
