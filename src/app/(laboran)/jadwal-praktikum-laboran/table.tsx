'use client'

import React, { useState, useEffect } from 'react';
import { columnsJadwalLaboran } from '@/components/(laboran)/Jadwal-praktikum-laboran/columns';
import Schedule from '@/types/schedule';
import { DataTable } from '@/components/(laboran)/Jadwal-praktikum-laboran/DataTable';
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { FormJadwalDialog } from '@/components/(praktikum)/Jadwal/formJadwal';
// import { auth } from "../auth"
import { auth } from '@/auth';
import MyCalendar from './calendar';
import { Separator } from "@/components/ui/separator"
import { MyEvent } from '@/types/event';
import { jwtDecode, JwtPayload } from "jwt-decode";
// import { exportToExcel } from '@/utils/exportToExcel'; // Import fungsi exportToExcel
import { exportToExcel } from '../../../../utils/exportExcel';
import { FileSpreadsheet } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ConflictCounts {
  iyaCount: number;
  tidakCount: number;
}

const KonflikCard: React.FC<ConflictCounts> = ({ iyaCount, tidakCount }) => (
  <Card className='bg-white'>
    <div className="p-4 ml-4">
      <h2 className="text-lg font-semibold mb-2">Jumlah Konflik</h2>
      <div className="flex items-center space-x-4">
        <p className="py-2">
          Iya <span className="bg-red-100 text-red-500 rounded-md px-2 py-1 border border-red-300 font-bold">{iyaCount}</span>
        </p>
        <p className="py-2">
          Tidak <span className="bg-blue-100 text-blue-500 rounded-md px-2 py-1 border border-blue-300 font-bold">{tidakCount}</span>
        </p>
      </div>
    </div>
  </Card>
);

export default function JadwalSection() {
  const { data: session } = useSession();
  const [conflictCounts, setConflictCounts] = useState({ iyaCount: 0, tidakCount: 0 });
  const [loading, setLoading] = useState(true); // Add loading state

  const fetcher = async (url: string) => {
    const storedJWT = localStorage.getItem('jwt');
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

    if (!jwtForRequest && session?.user?.jwt) {
      jwtForRequest = session.user.jwt;
    }

    const attemptFetch = async (retryCount = 3, delay = 1000) => {
      for (let attempt = 0; attempt < retryCount; attempt++) {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwtForRequest}`,
          },
        });

        if (res.ok) {
          return res.json();
        }

        await new Promise(res => setTimeout(res, delay));
      }

      throw new Error("An error occurred while fetching the data.");
    };

    return attemptFetch();
  };

  const initialData: Schedule[] = [];

  const { data, error } = useSWR(
    "http://localhost:5000/jadwal-table-laboran",
    fetcher,
    {
      initialData,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false, 
    }
  );

  const countConflicts = (data: Schedule[]) => {
    let iyaCount = 0;
    let tidakCount = 0;

    data.forEach((row) => {
      if (!row.room?.name) {
        tidakCount++;
      } else {
        const conflictingRows = data.filter(
          (otherRow) =>
            otherRow.tanggal === row.tanggal &&
            otherRow.room?.name === row.room?.name &&
            otherRow.shift.waktu_shift === row.shift.waktu_shift &&
            otherRow.id !== row.id
        );
        if (conflictingRows.length > 0) {
          iyaCount++;
        } else {
          tidakCount++;
        }
      }
    });

    return { iyaCount, tidakCount };
  };

  useEffect(() => {
    if (data) {
      const counts = countConflicts(data);
      setConflictCounts(counts);
      setLoading(false); // Set loading to false when data is fetched
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const handleExport = () => {
    exportToExcel(columnsJadwalLaboran, data, 'Jadwal-Praktikum');
  };

  return (
    <div className="p-10 bg-white">
      <MyCalendar />
      <div className="flex items-center mt-5 gap-5 py-5">
        {/* Tombol export */}
        <button
          onClick={handleExport}
          className="flex gap-2 bg-green-500 text-white font-bold py-4 px-4 rounded-md hover:bg-green-700"
        >
          <FileSpreadsheet />
          Export to Excel
        </button>
        <KonflikCard {...conflictCounts} /> 
      </div>
      <DataTable columns={columnsJadwalLaboran} data={data} />
    </div>
  );
}