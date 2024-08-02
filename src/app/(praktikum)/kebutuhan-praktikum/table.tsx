'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { columns } from '@/components/(praktikum)/Kebutuhan/columns';
import Prioritas from '@/types/prioritas';
// import { DataTable } from "@/components/(laboran)//DataTable";
import { DataTable } from '@/components/(praktikum)/Kebutuhan/DataTable';
import { useSession } from 'next-auth/react';
// import { FormKebutuhanDialog } from '@/components/(laboran)/Prioritas-kebutuhan/formKebutuhanDialog';
import useSWR from "swr";
import { mutate } from 'swr';
// import { FormKebutuhanDialog } from '@/components/(laboran)/Prioritas-kebutuhan/formKebutuhan';
import { FormKebutuhanDialog } from '@/components/(praktikum)/Kebutuhan/formKebutuhan';
// import { auth } from "../auth"
import { auth } from '@/auth';
import { useEffect, useState } from 'react';

interface KebutuhanType {
  nama_praktikum: string;
  // ... other properties
}

export default function KebutuhanPrioritasSection() {
  const { data: session, status } = useSession();
  // const [jwt, setJwt] = useState<string | null>(null);

  const fetcher = async (url: string) => {
    const jwt = session?.user.jwt;
    if (!jwt) {
      throw new Error("JWT not available yet");
    }

    console.log("JWT being sent:", jwt);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status}`);
    }
    return res.json();
    
  };

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/kebutuhan-modul-user",
    fetcher,
    {
      // Adjust these options based on your revalidation needs
      revalidateIfStale: false,  // Only revalidate if data is stale
      revalidateOnReconnect: true, // Revalidate when the connection is restored
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.message === "JWT not available yet" && retryCount < 3) {
          setTimeout(() => revalidate({ retryCount }), 500);
        }
      },
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
    
  // ... rest of your component (error handling, loading state, rendering)
  return (
    <>
      <div className='p-10 bg-white'>
      <FormKebutuhanDialog mutate={() => mutate("http://localhost:5000/kebutuhan-modul-user")}/>
      <DataTable columns={columns} data={data} />
      {/* <TableRuangan /> */}
      </div>
    </>
  );
}

// async function getData(): Promise<PrioritasType[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "Modul Perancangan Ilust 3D",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "OOP",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "WAD",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "Modul Perancangan Ilust 3D",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "Modul Perancangan Ilust 3D",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
//     {
//       kebutuhan_id: "1",
//       user_uuid: "1",
//       user_qty: 100,
//       nama_modul: "Modul Perancangan Ilust 3D",
//       keterangan_modul: "Design 3D + 4D",
//       status: "online",
//       select_pc: "High End",
//     },
    
//   ]
// }

// export default async function PrioritasSection() {

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