'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';
import Schedule from '@/types/schedule';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const { data: session, status } = useSession();
  const [date, setDate] = useState(moment().toDate());
  const [events, setEvents] = useState<any[]>([]);

  const fetcher = async (url: string) => {
    const storedJWT = localStorage.getItem('jwt');

    // Use the stored JWT for the request if it exists and is valid
    let jwtForRequest = storedJWT;
    if (storedJWT) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(storedJWT);
        if (typeof decodedToken.exp === 'number' && decodedToken.exp > Date.now() / 1000) {
          // JWT is valid and not expired
        } else {
          localStorage.removeItem('jwt');
          jwtForRequest = null;
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        localStorage.removeItem('jwt');
        jwtForRequest = null;
      }
    }

    // Fallback to session JWT if stored JWT is invalid or doesn't exist
    if (!jwtForRequest && session?.user?.jwt) {
      jwtForRequest = session.user.jwt;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtForRequest}`,
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading } = useSWR<Schedule[]>(
    'http://localhost:5000/jadwal-table-laboran',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );


  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      const formattedEvents = data.map(schedule => ({
        start: moment(schedule.tanggal + ' ' + schedule.shift.waktu_shift, 'YYYY-MM-DD HH:mm:ss').toDate(),
        end: moment(schedule.tanggal + ' ' + schedule.shift.waktu_shift, 'YYYY-MM-DD HH:mm:ss').add(1, 'hour').toDate(),
        title: schedule.nama_praktikum,
        room: schedule.room ? schedule.room.name : 'Ruangan Tidak Ada', // Jika room null, maka tampilkan 'Ruangan Tidak Ada'
      }));
      console.log("Formatted events:", formattedEvents);
      setEvents(formattedEvents);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onNavigate={handleNavigate}
        date={date}
        // views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // Specify available views
        // views={{ month: true, week: true, day: true, agenda: true }}
        // defaultView={Views.MONTH} // Default to month view
        views={['month', 'week', 'day', 'agenda']} // Specify available views as an array
        defaultView="agenda" // Default to month view
      />
    </div>
  );
};

export default MyCalendar;
