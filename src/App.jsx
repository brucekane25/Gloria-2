import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MapComponent from "./components/MapComponent";
import apiClient from "./api/axios";
import CategoryDropdown from "./components/CategoryDropdown";
import Navbar from "./components/Navbar";
import RangeSlider from "./components/RangeSlider";
import { IconButton, rgbToHex } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "./components/Pane";
import categorizeEvents from "./components/CategoriseEvents";
import { red } from "@mui/material/colors";
import LeftSliders from "./components/LeftSliders";
import RightSliders from "./components/RightSliders";
import AlternativeDrawer from "./components/AlternativeDrawer";

function App() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterpages, setFilterPages] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomEvents, setRandomEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(null);
  const [filterTotalEvents, setFilterTotalEvents] = useState(null);
  const [yearRange, setYearRange] = useState({
    startYear: 500,
    endYear: 2000,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
 const [isOpen, setIsOpen] = useState(false)
 const [isSlider, setIsSlider] = useState(false)
 const colors = {
    primary: "#aad8aa", // Soft pastel green
    secondary: "#326232", // Soft pink
    background: "#FFE0B2", // Pale peach
    accent: "#B4C7E7", // Light pastel blue
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
      },
      accent: {
        main: colors.accent,
      },
    },
  });

  const getRandomEvents = (count) => {
    const filteredEvents = events.filter((event) => event.thumbnail !== null);
    const shuffled = filteredEvents.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const randomizeEvents = () => {
    setRandomEvents(getRandomEvents(10));
    setSelectedEvent(null);
  };

  useEffect(() => {
    randomizeEvents();
  }, [events]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEventsWithCoordinates(
        currentPage,
        limit,
        yearRange.startYear,
        yearRange.endYear
      );
      if (data) {
        const categorizedEvents = await categorizeEvents(data.events);
        const filterEvents = selectedCategory
          ? categorizedEvents.filter(
              (event) => event.category === selectedCategory
            )
          : categorizedEvents;

        setEvents(filterEvents);
        setPages(data.totalPages);
        setTotalEvents(data.totalEvents);
        setFilterTotalEvents(filterEvents.length);
      }
    };
    fetchData();
    setSelectedEvent(null);
  }, [currentPage, yearRange, selectedCategory, limit]);

  const fetchEventsWithCoordinates = async (
    page,
    limit,
    startYear,
    endYear
  ) => {
    try {
      const response = await apiClient.get("/coordinates", {
        params: { page, limit, startYear, endYear },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching events with coordinates:", error);
      return null;
    }
  };


  // return (
  //   <ThemeProvider theme={theme}>
  //     <div
  //       className={`canvas  flex-col md:flex-row relative transition-all ${
  //         isOpen && window.innerWidth >= 1024 ? "md:max-w-[72%]" : "w-full"
  //       }`}
  //     >
  //       <Navbar 
  //         setSelectedEvent={setSelectedEvent}
  //         isOpen={isOpen}
          
  //         setIsOpen={setIsOpen}
  //       />
  //       {window.innerWidth >= 1024 ? (
  //         <Drawer
  //           setIsOpen={setIsOpen}
  //           isOpen={isOpen}
  //           events={randomEvents}
  //           randomizeEvents={randomizeEvents}
  //           onEventClick={setSelectedEvent}
  //         />
  //       ) : (


  //         <AlternativeDrawer
  //           events={events}
  //           onEventClick={setSelectedEvent}
  //           isSlider={isSlider}
  //           setIsSlider={setIsSlider}
  //         />
  //       )}
  //       <div className={`container-main flex relative flex-col p-0`}>
  //         {window.innerWidth <= 1024?(
  //           <div className="absolute z-[99] bottom-28 left-[45%] bg-white" >Hello</div>
            
  //         ):(<></>)}
          
  //         <div className="container-sec flex-grow flex flex-col items-center my-0 px-4 md:px-1 transition-all">
  //           <div className="slider-cont flex flex-col bg-gray-100/80 px-8 py-2 absolute max-w-fit top-[20px] rounded-full z-[99] sm:flex-row items-center justify-around min-w-28">
  //         {window.innerWidth >= 1024?(
  //           <LeftSliders
  //           yearRange={yearRange}
  //           setSelectedEvent={setSelectedEvent}
  //           setYearRange={setYearRange}
  //           setSelectedCategory={setSelectedCategory}
  //           />
  //         ):(<></>)}

  //         {/* <RightSliders setLimit={setLimit} colors={colors} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} filterTotalEvents={filterTotalEvents} totalEvents={totalEvents} /> */}
  //           </div>
  
  //           <div className="map h-screen relative w-full mt-4 -z-0 ">
  //             <MapComponent events={events} selectedEvent={selectedEvent} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </ThemeProvider>
  // );
  
  return (
    <ThemeProvider theme={theme}>
      <div
        className={`canvas h-screen w-screen flex-col md:flex-row relative transition-all ${
          isOpen && window.innerWidth >= 1024 ? "md:max-w-[72%]" : "w-full"
        }`}
      >
        {/* Only show Navbar on larger screens */}
        {window.innerWidth >= 1024 && (
          <Navbar 
            setSelectedEvent={setSelectedEvent}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        {window.innerWidth >= 1024 ? (
          <Drawer
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            events={randomEvents}
            randomizeEvents={randomizeEvents}
            onEventClick={setSelectedEvent}
          />
        ) : (
          <AlternativeDrawer
            events={events}
            onEventClick={setSelectedEvent}
            isSlider={isSlider}
            setIsSlider={setIsSlider}
          />
        )}

        <div className={`container-main flex relative flex-col p-0`}>
          {window.innerWidth <= 1024 && (
            <div className="absolute z-[99] bottom-28 left-[45%] bg-white">
              Hello
            </div>
          )}
          
          <div className="container-sec flex-grow flex flex-col items-center my-0 px-4 md:px-1 transition-all">
            <div className="slider-cont flex flex-col bg-gray-100/80 px-8 py-2 absolute max-w-fit top-[20px] rounded-full z-[99] sm:flex-row items-center justify-around min-w-28">
              {window.innerWidth >= 1024 ? (
                <LeftSliders
                  yearRange={yearRange}
                  setSelectedEvent={setSelectedEvent}
                  setYearRange={setYearRange}
                  setSelectedCategory={setSelectedCategory}
                />
              ) : (
                <div className="text-center text-sm sm:text-base font-medium">
                  Exploring Historical Events
                </div>
              )}
            </div>
  
            <div className="map h-screen relative w-full mt-4 -z-0">
              <MapComponent events={events} selectedEvent={selectedEvent} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );

}

export default App;
