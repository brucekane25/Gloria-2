import { Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Pane = ({ isOpen, setIsOpen, events, randomizeEvents, onEventClick }) => {

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width:'28%', // Adjust the width as needed
            backgroundColor: "#f7f7f7",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {/* Pane Header */}
        <div className="flex items-center mt-3 px-4 pb-3 justify-between">
          <h2 className="text-lg font-semibold">Random Events</h2>
          <button
            onClick={randomizeEvents}
            className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
          >
            Randomize
          </button>
        </div>

        {/* Pane Content */}
        <div className="p-4 overflow-y-auto">
          <ul className="space-y-4">
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
                    {event.thumbnail ?  (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ):null}
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow ml-4">
                    <h3 className="text-base font-medium line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.year}</p>
                  </div>

                  {/* Category */}
                  <div className="bg-gray-500 text-white text-sm px-2 py-1 rounded">
                    {event.category}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Pane;
