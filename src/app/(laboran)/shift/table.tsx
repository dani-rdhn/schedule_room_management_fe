'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { ShiftType, columns } from '@/components/(laboran)/Shift/columns'
import { DataTable } from "@/components/(laboran)/Shift/DataTable";
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { auth } from '@/auth';
import { FormShiftDialog } from '@/components/(laboran)/Shift/formShift';
import { useState, useEffect } from 'react';
import { mutate } from 'swr';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export default function ShiftSection() {
  const { data: session, status } = useSession();
  const [jwt, setJwt] = useState<string | null>(null);

  const fetcher = async (url: string) => {
    const storedJWT = localStorage.getItem('jwt');

    // Use the stored JWT for the request if it exists and is valid
    let jwtForRequest = storedJWT;
    if (storedJWT) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(storedJWT);

        // Optional: Check if 'exp' exists and is a number
        if (typeof decodedToken.exp === 'number' && decodedToken.exp > Date.now() / 1000) {
          // JWT is valid and not expired
        } else {
          localStorage.removeItem('jwt');
          jwtForRequest = null;
        }
      } catch (error) {
        // Handle decoding errors
        console.error("Error decoding JWT:", error);
        localStorage.removeItem('jwt'); // Remove potentially invalid JWT
        jwtForRequest = null;
      }
    }

    // Fallback to session JWT if stored JWT is invalid or doesn't exist
    if (!jwtForRequest && session?.user?.jwt) {
      jwtForRequest = session.user.jwt;
    }

    console.log("JWT being sent:", jwtForRequest);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtForRequest}`,
      },
    });

    if (!res.ok) {
      throw new Error(`An error occurred while fetching the data. Status: ${res.status}`);
    }

    return res.json();
  };

  const initialData: ShiftType[] = [];

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/shifts",
    fetcher,
    {
      initialData,
      revalidateOnFocus: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount < 3) {
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
      <FormShiftDialog mutate={() => mutate("http://localhost:5000/shifts")} />
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