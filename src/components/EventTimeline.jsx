import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from "@mui/lab";
import { FixedSizeList as List } from "react-window";

const EventTimeline = ({ events, onEventClick, isLeftOpen, setisLeftOpen }) => {
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  const Row = ({ index, style }) => {
    const event = sortedEvents[index];
    return (
      <TimelineItem key={event._id} style={style}>
        <TimelineSeparator>
          <TimelineDot className="bg-blue-950" />
          <TimelineConnector className="bg-gray-300" />
        </TimelineSeparator>
        <TimelineContent
          onClick={() => {
            onEventClick(event);
            setisLeftOpen(!isLeftOpen);
          }}
          sx={{ cursor: "pointer" }}
        >
          <div className="line-clamp-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-gray-800">{event.year}</h3>
            <p className="text-sm text-gray-600">{event.title}</p>
          </div>
        </TimelineContent>
      </TimelineItem>
    );
  };

  return (
    <Timeline
      position="alternate"
      className=" p-3 rounded-md h-[87vh] drop-shadow-xl"
    >
      <List
        itemCount={sortedEvents.length}
        height={900}
        itemSize={70}
        width="100%"
      >
        {Row}
      </List>
    </Timeline>
  );
};

export default EventTimeline;
