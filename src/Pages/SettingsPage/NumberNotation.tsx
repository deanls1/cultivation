import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { SettingsContext } from "GameEngine";
import React from "react";
import { useTranslation } from "react-i18next";

export default function NumberNotation() {
  const { notation, updateContext } = React.useContext(SettingsContext);
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h6">{t("Number Notation")}</Typography>
      <FormControl>
        <RadioGroup defaultValue={notation} name="radio-buttons-group">
          <FormControlLabel
            value="trivial"
            control={<Radio />}
            label={t("trivial")}
            onClick={() => updateContext({ notation: "trivial" })}
          />
          <FormControlLabel
            value="exponential"
            control={<Radio />}
            label={t("exponential")}
            onClick={() => updateContext({ notation: "exponential" })}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
