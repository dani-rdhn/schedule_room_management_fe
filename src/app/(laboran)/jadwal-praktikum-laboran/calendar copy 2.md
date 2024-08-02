// components/Calendar.tsx
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, Views, Navigate } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns'; 
import getDay from 'date-fns/getDay';
import id from 'date-fns/locale/id'; // Import lokal bahasa Indonesia
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { Button } from '@/components/ui/button';

const locales = {
  'id': id, // Tambahkan lokal bahasa Indonesia
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), // Minggu dimulai pada hari Senin
  getDay,
  locales,
});

const events: Event[] = [
  {
    title: 'Pertemuan',
    start: new Date(),
    end: new Date(),
  },
];

const MyCalendar: React.FC = React.memo(() => {
  const [view, setView] = useState<keyof typeof Views>('MONTH');
  const [date, setDate] = useState<Date>(new Date());

  const handleViewChange = (view: keyof typeof Views) => {
    setView(view);
  };

  const handleNavigate = (newDate: Date, action: keyof typeof Navigate) => {
    if (action === Navigate.TODAY) {
      setDate(new Date());
    } else {
      setDate(newDate);
    }
  };
    
  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => handleNavigate(date, Navigate.PREV)}>
          Sebelumnya
        </Button>
        <Button variant="outline" onClick={() => handleNavigate(date, Navigate.TODAY)}>
          Hari Ini
        </Button>
        <Button variant="outline" onClick={() => handleNavigate(date, Navigate.NEXT)}>
          Selanjutnya
        </Button>
      </div>
      <div className="flex space-x-4 mb-4">
        {/* Tombol untuk mengubah tampilan */}
        <Button variant="outline" onClick={() => handleViewChange('MONTH')}>
          Bulan
        </Button>
        <Button variant="outline" onClick={() => handleViewChange('WEEK')}>
          Minggu
        </Button>
        <Button variant="outline" onClick={() => handleViewChange('DAY')}>
          Hari
        </Button>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        view={view}
        onView={(view) => setView(view as keyof typeof Views)} // Konversi ke Views
        components={{
          eventWrapper: (props) => (
            <DialogTrigger>
              <div>{props.children}</div> {/* Memeriksa props.children */}
              <Dialog>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{props.event?.title}</DialogTitle> {/* Memeriksa props.event?.title */}
                    <DialogDescription>
                      Mulai: {props.event?.start?.toLocaleString()} {/* Memeriksa props.event?.start */}
                      <br />
                      Selesai: {props.event?.end?.toLocaleString()} {/* Memeriksa props.event?.end */}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DialogTrigger>
          ),
        }}
      />
    </div>
  );
});

MyCalendar.displayName = 'MyCalendar'; // Menambahkan displayName

export default MyCalendar; // Pastikan ini ada di akhir file
