import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MapComponent from "./components/MapComponent";
import apiClient from "./api/axios";
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";
import Drawer from "./components/Pane";
import categorizeEvents from "./components/CategoriseEvents";
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import LeftSliders from "./components/LeftSliders";
import RightSliders from "./components/RightSliders";
import AlternativeDrawer from "./components/AlternativeDrawer";
import { useMediaQuery } from "@mui/material";
import BottomAppBar from "./components/BottomBar";
import DownArrow from "@mui/icons-material/ArrowDownwardTwoTone";
import VerticalSlider from "./components/VerticalSlider";
import { themes } from "./themes/colorThemes";
import LeftDrawer from "./components/LeftDrawer";
function App() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterpages, setFilterPages] = useState(0);
  const [limit, setLimit] = useState(4200);
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
  const [isLeftOpen, setisLeftOpen] = useState(false)
 const [isSlider, setIsSlider] = useState(false)


  const theme = createTheme({
    palette: {
      primary: {
        main: themes.light.primary,
      },
      secondary: {
        main: themes.light.secondary,
      },
      background: {
        default: themes.light.background,
      },
      accent: {
        main: themes.light.accent,
      },
    },
  });
  

  const StyledFab = styled(Fab)({
    margin: '0 auto',
  });
  const getRandomEvents = (count) => {
    const filteredEvents = events.filter((event) => event.thumbnail !== null);
    const shuffled = filteredEvents.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const randomizeEvents = () => {
    setRandomEvents(getRandomEvents(16));
    setSelectedEvent(null);
  };
  const handleMobileSlider = () => {
    setMobileSlider(!mobileSlider)
  }
  const [mobileSlider, setMobileSlider] = useState(true);
  const [open, setOpen] = useState(false);
  
  const [currentTheme, setCurrentTheme] = useState('light');
  

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
          {!isDesktop && mobileSlider && (
            <div className="fixed z-[999] bottom-[47vh] top-auto translate-y-1/2 right-2 flex flex-col items-center gap-2"  >
              <VerticalSlider className="" setSelectedEvent={setSelectedEvent} yearRange={yearRange} setYearRange={setYearRange}/>

            </div>

          )}

          {!isDesktop && isSlider && (
            
            <div className="fixed z-[9999] bottom-[5vh] top-auto  left-1/2 -translate-x-1/2">
              
               <button onClick={() => setIsSlider(!isSlider)} 
                >
                  <StyledFab color="secondary" >
                <DownArrow />
                  </StyledFab>
                </button>
                </div>
                            
          )}
      <div className="main-cont h-screen w-screen overflow-hidden">
        <LeftDrawer setisLeftOpen={setisLeftOpen} isLeftOpen={isLeftOpen} events={events} onEventClick={setSelectedEvent}  />
        <div className={`canvas flex flex-col relative  transition-all h-full
         ${isDesktop && isOpen ? "max-w-[70%]" : "w-full"} 
         `}>
          {isDesktop?( <Navbar setSelectedEvent={setSelectedEvent} isLeftOpen={isLeftOpen} setisLeftOpen={setisLeftOpen} isOpen={isOpen} setIsOpen={setIsOpen} />):(<BottomAppBar isSlider={isSlider} setisLeftOpen={setisLeftOpen} isLeftOpen={isLeftOpen} mobileSlider={mobileSlider} 
          setMobileSlider={setMobileSlider} setIsSlider={setIsSlider} />)}
          
          
          <div className="sliders-cont absolute flex flex-col items-center left-1/2 -translate-x-1/2 top-[88px] z-[999]">
            {isDesktop ? (
              <div style={{ backgroundColor: themes.light.accent, opacity:0.73 }}className={` px-4 min-h-full rounded-md pb-2 w-fit max-w-fit`}>

                <LeftSliders
                  yearRange={yearRange}
                  setSelectedEvent={setSelectedEvent}
                  setYearRange={setYearRange}
                  setSelectedCategory={setSelectedCategory}
                  />
                   {/* <RightSliders setLimit={setLimit} colors={colors} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} filterTotalEvents={filterTotalEvents} totalEvents={totalEvents} />  */}

              </div>
            ) : (
              <>
              </>
            )}
          </div>
          {isDesktop ? (
            <Drawer setIsOpen={setIsOpen} isOpen={isOpen}  randomEvents={randomEvents} randomizeEvents={randomizeEvents} onEventClick={setSelectedEvent} />
          ) : (
            <AlternativeDrawer events={randomEvents} onEventClick={setSelectedEvent} isSlider={isSlider} randomizeEvents={randomizeEvents} setIsSlider={setIsSlider} />
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

  

export default App;
