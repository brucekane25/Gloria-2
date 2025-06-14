import React from "react";
import { themes } from "../themes/colorThemes";
import Settings from "@mui/icons-material/Settings";
import SunIcon from "@mui/icons-material/WbSunny";
import MoonIcon from "@mui/icons-material/DarkMode";
import Dice from "@mui/icons-material/Casino";
import Timeline from "@mui/icons-material/Timeline";
import { Fab, styled } from "@mui/material";

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
  const StyledFab = styled(Fab)({
    margin: "0 auto",
  });
  return (
    <>
      {panel ? (
        <div className="absolute flex flex-col gap-2 bottom-[8%] right-6 z-[999]">
              <StyledFab
                title="Timeline"
                onClick={() => {
                  setisLeftOpen(!isLeftOpen);
                }}
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
                onClick={() => {
                  setmode(!mode);
                }}
                title={`${mode ? `Dark Mode` : `Light Mode`}`}
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
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Dice
                  disableRipple
                  sx={{
                    color: !mode ? "white" : "black",
                  }}
                />
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
                onClick={() => {
                  setsettings(!settings);
                }}
              >
                <Settings sx={{ color: !mode ? "white" : "black" }} />
              </StyledFab>
              <StyledFab
                title="Timeline"
                onClick={() => {
                  setPanel(!panel);
                }}
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
            </div>
          ) : (
            <div className="absolute bottom-[8%] right-6 z-[999]">
              <StyledFab
                title="Timeline"
                onClick={() => {
                  setPanel(!panel);
                }}
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
            </div>
          )}
        

        </>
      )
      
      
      
    
  
};

export default SettingsIcons;
