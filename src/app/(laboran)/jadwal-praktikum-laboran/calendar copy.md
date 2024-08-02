'use client'
import React, { useState } from 'react';
import { Calendar, CalendarProps, momentLocalizer, Navigate, Views } from "react-big-calendar";

import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('id');
const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Praktikum Kimia',
      start: new Date(2024, 6, 15, 10, 0),
      end: new Date(2024, 6, 15, 12, 0),
    },
    // ... tambahkan event lainnya
  ]);
    
  const [currentView, setCurrentView] = useState<Views>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleViewChange = (view: Views) => {
    setCurrentView(view);
  };

  const handleNavigate = (newDate: Date, action: Navigate) => {
    if (action === Navigate.TODAY) {
      setCurrentDate(new Date());
    } else {
      setCurrentDate(newDate);
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        // Nonaktifkan fitur pemilihan slot waktu
        selectable={false} 
      />
    </div>
  );
};

export default MyCalendar;
