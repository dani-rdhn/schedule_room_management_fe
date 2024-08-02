import React from 'react';
import { Calendar, Event, Views, momentLocalizer } from 'react-big-calendar'; // Corrected import
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MyEvent } from '@/types/event';
import moment from 'moment'; 

const localizer = momentLocalizer(moment); 

interface MyCalendarProps {
  events: MyEvent[];
  onSelectEvent: (event: MyEvent) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events, onSelectEvent }) => {
  const handleSelectEvent = (event: Event) => {  // Use Event directly
    onSelectEvent(event as MyEvent); 
  };
  
    // Dummy data for testing
  const dummyEvents: MyEvent[] = [
    {
      id: '1',
      title: 'Meeting',
      start: new Date(2024, 6, 8, 10, 0, 0),
      end: new Date(2024, 6, 8, 12, 0, 0),
    },
    {
      id: '2',
      title: 'Presentation',
      start: new Date(2024, 6, 10, 13, 0, 0),
      end: new Date(2024, 6, 10, 15, 0, 0),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer} 
        // events={events}
        events={dummyEvents}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
      />
    </div>
  );
};

export default MyCalendar;
