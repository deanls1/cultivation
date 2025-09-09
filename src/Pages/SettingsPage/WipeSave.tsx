import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function WipeSave() {
  const { t } = useTranslation();

  const wipe = () => {
    localStorage.removeItem("player");
    localStorage.removeItem("game");
    // 清理可能存在的翻译缓存
    localStorage.removeItem("i18nextLng");
    // 刷新页面以重新加载默认数据
    window.location.reload();
  };

  return (
    <Button variant="outlined" color="error" onClick={wipe}>
      {t("Wipe Save")}
    </Button>
  );
}
