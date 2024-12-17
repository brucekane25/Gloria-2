import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MapComponent from "./components/MapComponent";
import apiClient from "./api/axios";
import CategoryDropdown from "./components/CategoryDropdown";
import Navbar from "./components/Navbar";
import RangeSlider from "./components/RangeSlider";
import Backdrop from "./components/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "./components/Pane";
import categorizeEvents from "./components/CategoriseEvents";
import { red } from "@mui/material/colors";
import LeftSliders from "./components/LeftSliders";
import RightSliders from "./components/RightSliders";
import AlternativeDrawer from "./components/AlternativeDrawer";
import { useMediaQuery } from "@mui/material";
import BottomAppBar from "./components/BottomBar";
import ChipsArray from "./components/CategoryChip";
function App() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterpages, setFilterPages] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomEvents, setRandomEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(null); 
  const isDesktop = useMediaQuery("(min-width: 1024px)");
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

  const [open, setOpen] = useState(false);

  
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
      setOpen(false)
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
    setOpen(true);
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
  return (
    <ThemeProvider theme={theme}>
      <div className="main-cont h-screen w-screen overflow-hidden">
        <div className={`canvas flex flex-col relative transition-all h-full ${isDesktop && isOpen ? "max-w-[70%]" : "w-full"}`}>
          {isDesktop?( <Navbar setSelectedEvent={setSelectedEvent} isOpen={isOpen} setIsOpen={setIsOpen} />):(<BottomAppBar/>)}
          <div className="sliders-cont absolute flex flex-col items-center left-1/2 -translate-x-1/2 top-20 z-[999]">
            {isDesktop ? (
              <div className="bg-gray-100/80 px-4 min-h-full rounded-full w-fit max-w-fit">
                <LeftSliders
                  yearRange={yearRange}
                  setSelectedEvent={setSelectedEvent}
                  setYearRange={setYearRange}
                  setSelectedCategory={setSelectedCategory}
                  />
          {/* <ChipsArray/> */}
              </div>
            ) : (
              <>
              </>
            )}
          </div>
          {isDesktop ? (
            <Drawer setIsOpen={setIsOpen} isOpen={isOpen} events={randomEvents} randomizeEvents={randomizeEvents} onEventClick={setSelectedEvent} />
          ) : (
            <AlternativeDrawer events={randomEvents} onEventClick={setSelectedEvent} isSlider={isSlider} setIsSlider={setIsSlider} />
          )}
          {!isDesktop && (
            <div className="absolute z-[9999] bottom-28 left-1/2 -translate-x-1/2">
              <button onClick={() => setIsSlider(!isSlider)} className="bg-white px-6 py-2 rounded-full shadow-lg">
                {!isSlider ? "Random Events" : "Close"}
              </button>
            </div>
          )}
          <div className="relative  h-full w-full">
<Backdrop open={open} setOpen={setOpen}/>
            <MapComponent events={events} selectedEvent={selectedEvent} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

  
// return (
//     <ThemeProvider theme={theme}>

        
//         {/* Conditional rendering of Drawer vs AlternativeDrawer based on screen size */}
//       <div className="main-cont h-screen w-screen overflow-hidden ">
//                 <div className={`canvas flex flex-col relative  transition-all h-full ${
//                   isOpen && window.innerWidth >= 1024 ? "max-w-[72%]" : "w-full"
//                 }`} 
//                 > 
//                 {window.innerWidth >= 1024 && (
//                   <Navbar setSelectedEvent={setSelectedEvent} isOpen={isOpen} setIsOpen={setIsOpen}/>
//                 )}
//  <div className="sliders-cont absolute  flex flex-col items-center left-[50%] -translate-x-1/2 top-20  z-[999]">
//                 {/* Controls Container */}
//                   {window.innerWidth >= 1024 ? (
//                     <div className="bg-gray-100/80 px-1 minhf rounded-full w-fit max-w-fit">
//                     <LeftSliders yearRange={yearRange}
//                       setSelectedEvent={setSelectedEvent}
//                       setYearRange={setYearRange}
//                       setSelectedCategory={setSelectedCategory}
//                     />
//                  {/* <RightSliders setLimit={setLimit} colors={colors} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} filterTotalEvents={filterTotalEvents} totalEvents={totalEvents} />  */}
//                 </div>
             
//                   ) : (<>Hello</>)}
//               </div> 
//                 {window.innerWidth >= 1024 ? (
//                   <Drawer setIsOpen={setIsOpen} isOpen={isOpen} events={randomEvents} randomizeEvents={randomizeEvents} onEventClick={setSelectedEvent} />
//                 ) : (
//                   <AlternativeDrawer events={randomEvents} onEventClick={setSelectedEvent} isSlider={isSlider} setIsSlider={setIsSlider}/>
//                 )}
//                 {/* Mobile Random Events Button */}
//                 {window.innerWidth < 1024 && (
//                   <div className="absolute z-[9999] bottom-28 left-1/2 -translate-x-1/2">
//                     <button onClick={() => setIsSlider(!isSlider)}
//                       className="bg-white px-6 py-2 rounded-full shadow-lg"
//                     >{!isSlider?"Random Events":"Close"}
//                     </button>
//                   </div>
//                 )}
               
//           {/* Main Content Container */}
//               {/* Content Section */}
//                 {/* Map Container - Full screen for mobile, full container for desktop */}
//                 {/* <div className={`inset-0 ${ window.innerWidth >= 1024?"top-16":""} w-full `}> */}
//                 <div className={`relative inset-0 h-full w-full `}>
//                   <MapComponent events={events} selectedEvent={selectedEvent}/>
//                 </div> 
//         </div>
//       </div>
//     </ThemeProvider>
//   );

// }

export default App;
