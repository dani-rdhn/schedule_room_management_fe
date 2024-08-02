'use client'

// import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { columns } from '@/components/(superadmin)/Manajemen-akun/columns'
// import { DataTable } from "@/components/(laboran)/Ruangan/DataTable";
import { DataTable } from "@/components/(superadmin)/Manajemen-akun/DataTable";
import axios from 'axios';
import { FormRuanganDialog } from '@/components/(laboran)/Ruangan/formRuangan';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react';
import useSWR, { mutate } from "swr";
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { toast } from "@/components/ui/use-toast";
// import { Toast } from '@/components/ui/toast';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast"
import { FormCreateAkun } from '@/components/(superadmin)/Manajemen-akun/formCreateAkun';

export default function ManajemenAkunSection() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const [jwt, setJwt] = useState<string | null>(null); // State to store the JWT

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
    "http://localhost:5000/users",
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   // return <div></div>;
  //   return <div>Error fetching data: {error.message}</div>;
  // }

  if (error) {
      if (error.response && error.response.status === 404) {
          return <div>Data ruangan tidak ditemukan.</div>;
      } else if (error.response && error.response.status === 500) {
          return <div>Terjadi kesalahan pada server. Silakan coba lagi nanti.</div>;
      } else if (error.response && error.response.status === 403) {
          return <div>Akses Ditolak: Anda tidak memiliki izin untuk mengakses sumber daya ini.</div>;
      } else {
          return <div>Tidak dapat terhubung ke server. Periksa koneksi internet Anda.</div>;
      }
  }

  // ... rest of your component (error handling, loading state, rendering)
  return (
    <>
      <div className='p-10 bg-white xl:flex gap-10'>
      {/* <FormRuanganDialog /> */}
      <FormCreateAkun mutate={() => mutate("http://localhost:5000/users")}/>
      <DataTable columns={columns} data={data} />
      {/* <TableRuangan /> */}
      </div>
    </>
  );
}

// async function GetData(): Promise<RuanganType[]> {

//   return [
//     {
//       id: "1",
//       name: "ruangan 1",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan 2",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan 3",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     // ...
//     {
//       id: "1",
//       name: "ruangan 4",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//       // ...
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//       // ...
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     {
//       id: "1",
//       name: "ruangan",
//       qty: 100,
//       pc: "High End",
//       lokasi: "m@example.com",
//     },
//     // ...
//   ]
// }

// export default async function RuanganSection() {

//   const data = await GetData()
//   return (
//     <>
//       <div className='p-10 bg-white'>
//       <FormRuanganDialog />
//       <DataTable columns={columns} data={data} />
//       {/* <TableRuangan /> */}
//       </div>
//     </>
//   );
// };