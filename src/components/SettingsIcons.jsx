import React, { useEffect, useState } from "react";
import { themes } from "../themes/colorThemes";
import Settings from "@mui/icons-material/Settings";
import SunIcon from "@mui/icons-material/WbSunny";
import MoonIcon from "@mui/icons-material/DarkMode";
import Dice from "@mui/icons-material/Casino";
import Timeline from "@mui/icons-material/Timeline";
import { Fab, styled } from "@mui/material";
import { Handyman } from "@mui/icons-material";

// Styled FAB
const StyledFab = styled(Fab)({
  margin: "0 auto",
  transition: "transform 0.3s ease, opacity 0.3s ease",
});

// Keyframe animations using inline <style>
const fabAnimations = `
@keyframes slideUp {
  0% { transform: translateY(40px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes slideDown {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(40px); opacity: 0; }
}
`;

const SettingsIcons = ({
  panel,
  setPanel,
  setisLeftOpen,
  isLeftOpen,
  setmode,
  mode,
  setIsOpen,
  isOpen,
  setsettings,
  settings,
}) => {
  const [showIcons, setShowIcons] = useState(panel);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (panel) {
      setShowIcons(true);
    } else {
      setAnimating(true);
      setTimeout(() => {
        setShowIcons(false);
        setAnimating(false);
      }, 300); // match animation duration
    }
  }, [panel]);

  return (
    <>
      <style>{fabAnimations}</style>

      {showIcons ? (
        <div
          className="absolute flex flex-col gap-2 bottom-[8%] right-6 z-[999]"
          style={{
            animation: panel
              ? "slideUp 0.3s ease forwards"
              : "slideDown 0.3s ease forwards",
          }}
        >
          <StyledFab
            title="Timeline"
            onClick={() => setisLeftOpen(!isLeftOpen)}
            sx={{
              backgroundColor: mode ? themes.light.background : "gray",
              ":hover": {
                backgroundColor: mode
                  ? themes.light.sbackground
                  : themes.dark.background,
              },
            }}
          >
            <Timeline sx={{ color: !mode ? "white" : "black" }} />
          </StyledFab>

          <StyledFab
            onClick={() => setmode(!mode)}
            title={mode ? "Dark Mode" : "Light Mode"}
            sx={{
              backgroundColor: mode ? themes.light.background : "gray",
              ":hover": {
                backgroundColor: mode
                  ? themes.light.sbackground
                  : themes.dark.background,
              },
            }}
          >
            {mode ? (
              <MoonIcon sx={{ color: !mode ? "white" : "black" }} />
            ) : (
              <SunIcon sx={{ color: !mode ? "white" : "black" }} />
            )}
          </StyledFab>

          <StyledFab
            title="Random Events"
            sx={{
              backgroundColor: mode ? themes.light.background : "gray",
              ":hover": {
                backgroundColor: mode
                  ? themes.light.sbackground
                  : themes.dark.background,
              },
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Dice sx={{ color: !mode ? "white" : "black" }} />
          </StyledFab>

          <StyledFab
            title="Tweaks"
            sx={{
              backgroundColor: mode ? themes.light.background : "gray",
              ":hover": {
                backgroundColor: mode
                  ? themes.light.sbackground
                  : themes.dark.background,
              },
            }}
            onClick={() => setsettings(!settings)}
          >
            <Settings sx={{ color: !mode ? "white" : "black" }} />
          </StyledFab>

          <StyledFab
            title="Settings"
            onClick={() => setPanel(!panel)}
            sx={{
              backgroundColor: mode ? themes.light.background : "gray",
              ":hover": {
                backgroundColor: mode
                  ? themes.light.sbackground
                  : themes.dark.background,
              },
            }}
          >
            <Handyman sx={{ color: !mode ? "white" : "black" }} />
          </StyledFab>
        </div>
      ) : (
        !animating && (
          <div className="absolute bottom-[8%] right-6 z-[999]">
            <StyledFab
              title="Settings"
              onClick={() => setPanel(!panel)}
              sx={{
                backgroundColor: mode ? themes.light.background : "gray",
                ":hover": {
                  backgroundColor: mode
                    ? themes.light.sbackground
                    : themes.dark.background,
                },
              }}
            >
              <Handyman sx={{ color: !mode ? "white" : "black" }} />
            </StyledFab>
          </div>
        )
      )}
    </>
  );
};

export default SettingsIcons;
