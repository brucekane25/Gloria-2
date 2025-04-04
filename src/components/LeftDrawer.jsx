import { Drawer } from "@mui/material";
import { useState } from "react";
import EventTimeline from "./EventTimeline";
import { themes } from "../themes/colorThemes";

const LeftDrawer = ({ isLeftOpen, setisLeftOpen, events ,onEventClick, mode}) => {
  const toggleDrawer = (newOpen) => () => {
    setisLeftOpen(newOpen);
  };

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isLeftOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            minWidth: '315px', 
            maxWidth: '30vw', 
            backgroundColor: mode?themes.light.background:themes.dark.primary ,
            color: mode?themes.light.text:themes.dark.text ,
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
            position: 'absolute', 
            left: '15px',
            top: '20px', 
            height: '95vh',
            borderRadius:'10px',
            overflow: "hidden" 
          },
        }}
        sx={{
          '--Drawer-transitionDuration': isLeftOpen ? '0.4s' : '0.2s',
          '--Drawer-transitionFunction': isLeftOpen
            ? 'cubic-bezier(0.79,0.14,0.15,0.86)'
            : 'cubic-bezier(0.77,0,0.18,1)',
        }}
      >
        <div className="flex items-center mt-3 ml-4 mb-2 justify-between">
          <h2 className="text-lg font-semibold">Timeline</h2>
        </div>
        <div className= "">
          <EventTimeline mode={mode} events={events} isLeftOpen={isLeftOpen} setisLeftOpen ={setisLeftOpen} onEventClick={onEventClick}/>
        </div>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
