'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./index.css";
import Schedule from '@/types/schedule';
import useSWR from "swr";
import { useSession } from 'next-auth/react';

const localizer = momentLocalizer(moment);

// const events = [
//   {
//     start: moment("2024-07-08T10:00:00").toDate(),
//     end: moment("2024-07-08T11:00:00").toDate(),
//     title: "MRI Registration",
//   },
//   {
//     start: moment("2024-07-08T12:00:00").toDate(),
//     end: moment("2024-07-08T13:00:00").toDate(),
//     title: "ENT Appointment",
//   },
//   {
//     start: moment("2024-07-08T12:00:00").toDate(),
//     end: moment("2024-07-08T13:00:00").toDate(),
//     title: "ENT Appointment",
//   },
// ];

const MyCalendar: React.FC = () => {
  const { data: session, status } = useSession();
  //   const [date, setDate] = useState(new Date()); // Tanggal awal hari ini
  const [date, setDate] = useState(moment().toDate()); // Simpan tanggal saat ini


  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user.jwt}`,
      },
    });

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      throw error;
    }

    return res.json();
  };

  const [events, setEvents] = useState<any[]>([]);

  const { data, error, isLoading } = useSWR<Schedule[]>(
    "http://localhost:5000/jadwal-table-laboran",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  
  const handleNavigate = (newDate: Date) => {
    setDate(newDate); // Perbarui tanggal saat ini saat navigasi
  };
  
  useEffect(() => {
    if (data) {
      const formattedEvents = data.map(schedule => ({
        start: moment(schedule.tanggal + ' ' + schedule.shift.waktu_shift, 'YYYY-MM-DD HH:mm:ss').toDate(),
        end: moment(schedule.tanggal + ' ' + schedule.shift.waktu_shift, 'YYYY-MM-DD HH:mm:ss').add(1, 'hour').toDate(),
        title: schedule.nama_praktikum,
        // ... (opsi lainnya)
      }));
      setEvents(formattedEvents);
    }
  }, [data]); // useEffect akan dijalankan setiap kali data berubah

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onNavigate={handleNavigate} // Tambahkan onNavigate
        date={date} // Tambahkan date
      />
    </div>
  );
};

export default MyCalendar;
