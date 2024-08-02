'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
// import { PrioritasType, columns } from '@/components/(praktikum)/Kebutuhan/columns';
// import { JadwalType, columns } from '@/components/(praktikum)/Jadwal/columns';
import { columns } from '@/components/(praktikum)/Jadwal/columns';
import Schedule from '@/types/schedule';
// import { DataTable } from "@/components/(laboran)//DataTable";
// import { DataTable } from '@/components/(praktikum)/Kebutuhan/DataTable';
import { DataTable } from '@/components/(praktikum)/Jadwal/DataTable';
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import { mutate } from 'swr';
import { FormJadwalDialog } from '@/components/(praktikum)/Jadwal/formJadwal';
// import { auth } from "../auth"
import { auth } from '@/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';

export default function JadwalSection() {
  const { data: session, status } = useSession();
  // const [data, setData] = useState<RuanganType[]>([]);

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

    console.log("JWT being sent:", jwtForRequest); // Log the JWT

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
    "http://localhost:5000/jadwal-table-user",
    fetcher,
    {
      initialData,
      revalidateOnFocus: false, // Adjust as needed
    }
  );

  useEffect(() => {
    if (error && error.message.includes("ERR_CONNECTION_REFUSED")) {
      // Handle ERR_CONNECTION_REFUSED secara khusus
      console.error("Backend tidak dapat dijangkau. Pastikan backend berjalan.");
      // ... (opsi penanganan lainnya, misalnya tampilkan pesan error yang lebih informatif)
    }
  }, [error]); // Jalankan useEffect hanya saat error berubah

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Terjadi kesalahan saat memuat data.</p>
        {/* ... (opsi penanganan lainnya, misalnya tampilkan pesan error yang lebih spesifik) */}
      </div>
    );
  }

  return (
    <>
      <div className='p-10 bg-white'>
      <FormJadwalDialog mutate={() => mutate("http://localhost:5000/jadwal-table-user")}/>
      <DataTable columns={columns} data={data} />
      {/* <TableRuangan /> */}
      </div>
    </>
  );
}

