'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
// import { PrioritasType, columns } from '@/components/(praktikum)/Kebutuhan/columns';
// import { JadwalType, columns } from '@/components/(praktikum)/Jadwal/columns';
// import { columns } from '@/components/(praktikum)/Jadwal/columns';
import { columnsJadwalLaboran } from '@/components/(laboran)/Jadwal-praktikum-laboran/columns';
import Schedule from '@/types/schedule';
// import { DataTable } from "@/components/(laboran)//DataTable";
// import { DataTable } from '@/components/(praktikum)/Kebutuhan/DataTable';
// import { DataTable } from '@/components/(praktikum)/Jadwal/DataTable';
import { DataTable } from '@/components/(laboran)/Jadwal-praktikum-laboran/DataTable';
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { FormJadwalDialog } from '@/components/(praktikum)/Jadwal/formJadwal';
// import { auth } from "../auth"
import { auth } from '@/auth';
import GenerateRuangan from '@/components/(laboran)/Pemetaan-ruangan/generateRuangan';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function PemetaanSection() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (data || error) {
      setLoading(false);
    }
  }, [data, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
    
  return (
    <div className='p-10 bg-white'>
      <GenerateRuangan />
    </div>
  );
}
