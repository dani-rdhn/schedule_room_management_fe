import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./index.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment("2024-07-08T10:00:00").toDate(),
    end: moment("2024-07-08T11:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2024-07-08T12:00:00").toDate(),
    end: moment("2024-07-08T13:00:00").toDate(),
    title: "ENT Appointment",
  },
  {
    start: moment("2024-07-08T12:00:00").toDate(),
    end: moment("2024-07-08T13:00:00").toDate(),
    title: "ENT Appointment",
  },
];

const MyCalendar: React.FC = () => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      onSelectEvent={handleSelectEvent}
    //   views={['month', 'week', 'day']}
    //   defaultView="month"
      selectable={true}
      style={{ minHeight: '100%' }}
      formats={{ dayHeaderFormat: (date) => moment(date).format("dddd @ DD") }}
    />
  </div>
);

export default MyCalendar;
