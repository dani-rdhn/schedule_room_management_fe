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

export default function JadwalSection() {
  const { data: session, status } = useSession();

  const fetcher = async (url: string) => {
    // Include the JWT in the Authorization header
    console.log("JWT being sent:", session?.user.jwt); // Log the JWT
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session?.user.jwt}`, // Assuming your JWT is accessible here
      },
    });
    // setData(response.data);

    if (!res.ok) {
      // Handle errors, e.g., by throwing an exception
      const error = new Error("An error occurred while fetching the data.");
      // error.status = res.status;
      throw error;
    }

    // console.log("Fetched data:", await res.json());
    return res.json();
  };

  const initialData: Schedule[] = []; // Empty array of RuanganType objects

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/jadwal-table-laboran",
    // "http://localhost:5000/kebutuhan-modul",
    fetcher,
    {
      initialData, // Option A only
      revalidateOnFocus: false, // Adjust as needed
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