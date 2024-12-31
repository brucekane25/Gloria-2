import { Timeline, TimelineItem, TimelineContent, TimelineSeparator, TimelineDot, TimelineConnector } from "@mui/lab";

const EventTimeline = ({ events, onEventClick,isLeftOpen, setisLeftOpen }) => {
  // Sort events by year in descending order
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  return (
    <Timeline position="alternate" className="max-h-[88vh] overflow-y-scroll p-3 bg-gray-100 rounded-md drop-shadow-xl">
      {sortedEvents.map((event) => (
        <TimelineItem key={event._id}>
          <TimelineSeparator>
            <TimelineDot className="bg-blue-950" />
            <TimelineConnector className="bg-gray-300" />
          </TimelineSeparator>
          <TimelineContent 
            onClick={() => {
              onEventClick(event);
              setisLeftOpen(!isLeftOpen)
            }} 
            sx={{ cursor: 'pointer' }}
          >
            <div className="line-clamp-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800">{event.year}</h3>
              <p className="text-sm text-gray-600">{event.title}</p>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default EventTimeline;
