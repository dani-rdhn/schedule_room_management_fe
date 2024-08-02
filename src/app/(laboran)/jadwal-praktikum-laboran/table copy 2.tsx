'use client'

import React, { useState } from 'react';
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

export default function JadwalSection() {
  const { data: session, status } = useSession();

  const fetcher = async (url: string) => {
    const storedJWT = localStorage.getItem('jwt');

    // Use the stored JWT for the request if it exists and is valid
    let jwtForRequest = storedJWT;
    if (storedJWT) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(storedJWT); // Type assertion

        // Optional: Check if 'exp' exists and is a number
        if (typeof decodedToken.exp === 'number' && decodedToken.exp > Date.now() / 1000) {
          // JWT is valid and not expired
        } else {
          localStorage.removeItem('jwt'); // Remove expired JWT
          jwtForRequest = null;
        }
      } catch (error) {
        // Handle decoding errors (e.g., malformed JWT)
        console.error("Error decoding JWT:", error);
        localStorage.removeItem('jwt'); // Remove potentially invalid JWT
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
      throw new Error("An error occurred while fetching the data.");
    }

    return res.json();
  };

  const initialData: Schedule[] = [];

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/jadwal-table-laboran",
    fetcher,
    {
      initialData,
      revalidateOnFocus: false,
      revalidateIfStale: false, // Prevent revalidation if the JWT is valid
      revalidateOnReconnect: false, 
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
    
  // ... rest of your component (error handling, loading state, rendering)
  return (
    <>
      <div className='p-10 bg-white'>
      {/* <FormJadwalDialog /> */}
      {/* <MyCalendar/> */}
      <MyCalendar />
      <Separator className="my-4 caret-slate-900" />
      <DataTable columns={columnsJadwalLaboran} data={data} />
      {/* <TableRuangan /> */}
      </div>
    </>
  );
}