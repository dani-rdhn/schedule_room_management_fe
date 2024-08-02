'use client'

import { RuanganType, columns } from '@/components/(laboran)/Ruangan/columns'
import { DataTable } from "@/components/(laboran)/Ruangan/DataTable";
import axios from 'axios';
import { FormRuanganDialog } from '@/components/(laboran)/Ruangan/formRuangan';
import { useSession, getSession, GetSessionParams } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSWR, { mutate } from 'swr';

// Define the types
interface SessionUser {
  jwt: string;
  [key: string]: any;
}

interface Session {
  user: SessionUser;
  [key: string]: any;
}

interface Props {
  initialData: any;
  jwt: string;
}

const fetcher = async (url: string, jwt: string) => {
  if (!jwt) {
    throw new Error("JWT not available");
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.status}`);
  }
  return res.json();
};

export default function RuanganSection({ initialData, jwt }: Props) {
  const { data: session } = useSession() as { data: Session | null };
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    jwt ? "http://localhost:5000/rooms" : null,
    (url: string) => fetcher(url, jwt),
    {
      initialData,
      revalidateIfStale: false,
      revalidateOnReconnect: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className='p-10 bg-white'>
      <FormRuanganDialog mutate={() => mutate("http://localhost:5000/rooms")} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context) as Session | null;

  if (!session || !session.user.jwt) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const jwt = session.user.jwt;

  try {
    const data = await fetcher('http://localhost:5000/rooms', jwt);

    return {
      props: {
        initialData: data,
        jwt,
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: null,
        jwt: null,
      },
    };
  }
}