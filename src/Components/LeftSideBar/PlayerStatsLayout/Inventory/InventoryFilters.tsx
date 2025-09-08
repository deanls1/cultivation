import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { InventoryFilters } from "../Inventory";

type Props = {
  type: InventoryFilters;
  setType: React.Dispatch<React.SetStateAction<InventoryFilters>>;
};

// Filter panel to the right of the inventory grid
export default function InventoryFiltersPane(props: Props) {
  const { type, setType } = props;
  const { t } = useTranslation();
  return (
    <Box width={128} height={512 - 128}>
      <Button
        variant="outlined"
        onClick={() => setType("all")}
        color={type === "all" ? "success" : "primary"}
        fullWidth
      >
        {t("all")}
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("money")}
        color={type === "money" ? "success" : "primary"}
        fullWidth
      >
        {t("money")}
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("treasure")}
        color={type === "treasure" ? "success" : "primary"}
        fullWidth
      >
        {t("treasures")}
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("mineral")}
        color={type === "mineral" ? "success" : "primary"}
        fullWidth
      >
        {t("minerals")}
      </Button>
      <Button
        variant="outlined"
        onClick={() => setType("herb")}
        color={type === "herb" ? "success" : "primary"}
        fullWidth
      >
        {t("Herbs")}
      </Button>
    </Box>
  );
}
