'use client'

import { columns } from '@/components/(laboran)/Prioritas-kebutuhan/columns';
import { DataTable } from '@/components/(laboran)/Prioritas-kebutuhan/DataTable';
import { useSession } from 'next-auth/react';
import useSWR, { mutate } from "swr";
import { auth } from '@/auth';
import { useState, useEffect } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

interface KebutuhanType {
  nama_praktikum: string;
  // ... other properties
}

export default function KebutuhanSection() {
  const { data: session, status } = useSession();
  // const [jwt, setJwt] = useState<string | null>(null);

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
    "http://localhost:5000/kebutuhan-modul-laboran",
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

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const alphaSort = (a: KebutuhanType, b: KebutuhanType) => {
    return a.nama_praktikum.localeCompare(b.nama_praktikum);
    };
    
  return (
    <>
      <div className='p-10 bg-white'>
      <DataTable 
        columns={columns} 
        data={data.sort(alphaSort)}
      />
      </div>
    </>
  );
}