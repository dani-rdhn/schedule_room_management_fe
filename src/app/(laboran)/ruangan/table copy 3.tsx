'use client'

import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { DataTable } from "@/components/(laboran)/Ruangan/DataTable";
import axios from 'axios';
import { FormRuanganDialog } from '@/components/(laboran)/Ruangan/formRuangan';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSWR, { mutate } from 'swr';
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function RuanganSection() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${jwtForRequest}` },
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status}`);
    }
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/rooms",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: true,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // You can customize the retry logic if needed
        if (retryCount < 3) {
          setTimeout(() => revalidate(), 500); 
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
      {/* <div className='p-10 bg-white'>
        <FormRuanganDialog />
        <DataTable columns={columns} data={data} />
      </div> */}
      <div className='p-10 bg-white'>
        <FormRuanganDialog mutate={() => mutate("http://localhost:5000/rooms")} />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}