'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { ShiftType, columns } from '@/components/(praktikum)/Shift/columns'
import { DataTable } from "@/components/(praktikum)/Shift/DataTable";
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { auth } from '@/auth';
import { FormShiftDialog } from '@/components/(praktikum)/Shift/formShift';
import { useState, useEffect } from 'react';

export default function ShiftSection() {
  const { data: session, status } = useSession();
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.jwt) {
      setJwt(session.user.jwt);
    }
  }, [session]); 

  const fetcher = async (url: string) => {
    if (!jwt) {
      throw new Error("JWT not available yet"); 
    }

    console.log("JWT being sent:", jwt);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, 
      },
    });

    if (!res.ok) {
      throw new Error(`An error occurred while fetching the data. Status: ${res.status}`); 
    }

    return res.json();
  };

  // Define initialData within the component
  const initialData: ShiftType[] = []; 

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/shifts", 
    fetcher,
    {
      initialData, 
      revalidateOnFocus: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.message === "JWT not available yet" && retryCount < 3) {
          setTimeout(() => revalidate({ retryCount }), 500); 
        }
      },
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
      {/* <FormKebutuhanDialog /> */}
      <FormShiftDialog />
      <DataTable columns={columns} data={data} />
      {/* <TableRuangan /> */}
      </div>
    </>
  );
}

// async function getData(): Promise<ShiftType[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       shift_id: "1",
//       start_time: "08:00:00",
//       end_time: "09:00:00",
//       keterangan: "Shift 1",
//     },
//     {
//       shift_id: "2",
//       start_time: "08:00:00",
//       end_time: "09:00:00",
//       keterangan: "Shift 2",
//     },
//     {
//       shift_id: "3",
//       start_time: "08:00:00",
//       end_time: "09:00:00",
//       keterangan: "Shift 3",
//     },
//     // ...
//   ]
// }

// export default async function ShiftSection() {

//   const data = await getData()
//   return (
//     <>
//       <div className='p-10 bg-white'>
//       <DataTable columns={columns} data={data} />
//       {/* <TableRuangan /> */}
//       </div>
//     </>
//   );
// };