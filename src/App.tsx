import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import LightTheme from "Themes/LightTheme";
import DarkTheme from "Themes/DarkTheme";

import PlayerLoader from "GameEngine/PlayerLoader";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import MainNavigationBar from "Components/MainNavigationBar";
import WorldLoader from "GameEngine/WorldLoader";
import LeftSideBar from "Components/LeftSideBar";
import React from "react";
import SettingsPage from "Pages/SettingsPage";
import SettingsLoader from "GameEngine/SettingsLoader";
import { MainWindow, states } from "Components/shared/useComponentSelector";
import { SettingsContext } from "GameEngine";

function AppContent() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  const [settings, setSettings] = React.useState<boolean>(false);
  const { theme } = React.useContext(SettingsContext);

  const currentTheme = theme === "light" ? LightTheme : DarkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box width={width} height={height} overflow="hidden">
        <TopBar setSettings={setSettings} />
        {settings && <SettingsPage setSettings={setSettings} />}
        {!settings && (
          <Box display="flex">
            <LeftSideBar />
            <MainWindow states={states} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SettingsLoader>
      <PlayerLoader>
        <WorldLoader>
          <GameRuntime>
            <AppContent />
          </GameRuntime>
        </WorldLoader>
      </PlayerLoader>
    </SettingsLoader>
  );
}
