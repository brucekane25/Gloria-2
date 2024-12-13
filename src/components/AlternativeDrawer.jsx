import { SwipeableDrawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const AlternativeDrawer = ({ isSlider, setIsSlider, events, onEventClick }) => {
  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isSlider}
        onClose={() => setIsSlider(false)}
        onOpen={() => setIsSlider(true)}
        swipeAreaWidth={20} // Adjust the swipe area width
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0,0,0,0.5)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center mt-3 px-4 justify-between">
          <h2 className="text-lg font-semibold">Events</h2>
          <IconButton
            onClick={() => setIsSlider(false)}
            aria-label="close drawer"
          >
            <MenuIcon />
          </IconButton>
        </div>

        {/* Drawer Content */}
        <div className="p-1 overflow-y-auto min-w-[420px]">
          <ul className="space-y-2">
            {events.map((event) => (
              <li
                key={event._id}
                className="p-3 bg-white rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center justify-between">
                  {/* Thumbnail */}
                  <div
                    className={`h-16 min-w-16 rounded-md ${
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

                  {/* Event Details */}
                  <div className="flex-grow ml-4">
                    <h3 className="text-base font-medium line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.year}</p>
                  </div>

                  {/* Category */}
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
