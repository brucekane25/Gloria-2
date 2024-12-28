import { SwipeableDrawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const AlternativeDrawer = ({ isSlider, setIsSlider, events, randomizeEvents, onEventClick }) => {
  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isSlider}
        onClose={() => setIsSlider(false)}
        onOpen={() => setIsSlider(true)}
        
        swipeAreaWidth={20} 
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(1,1,1,0.5 )",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }, 
          
        }}
      >
        <div  className="flex items-center pb-3 mt-2 px-4 justify-between">
          <h2 aria-label="close drawer" onClick={() => {setIsSlider(false)}} className="text-2xl text-white font-bold">Random Events</h2>
          <button
            onClick={randomizeEvents}
            className="px-4 mt-1 py-2 bg-blue-500 text-white rounded "
          >
            Randomize
          </button>
        </div>

        <div className="p-1 overflow-auto max-h-[60vh] min-w-[320px]">
          <ul className="space-y-2">
            {events.map((event) => (
              <li
                key={event._id}
                className="p-3 bg-white rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  onEventClick(event);
                  setIsSlider(!isSlider)
                }
              }
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`h-14 min-w-14 rounded-md ${
                      event.thumbnail ? "overflow-hidden" : "bg-gray-300"
                    }`}
                  >
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex-grow ml-4">
                    <h3 className="text-base font-medium line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.year}</p>
                  </div>

                  <div className="bg-gray-800 text-white text-sm px-2 py-1 rounded">
                    {event.category}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default AlternativeDrawer;
