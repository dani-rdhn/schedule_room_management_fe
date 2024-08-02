'use client';
import React from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession

// eslint-disable-next-line @next/next/no-async-client-component
export default function DashboardLaboran() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div>Loading...</div> // Handle loading state
7
  if (!session) {
    // router.push('/login'); // Redirect to login if no session
    // return null;
    redirect('/login')
  }

  if (session && session.user.role === 'laboran') {
    // Render content for admins
    return <div>Laboran-only content</div>;
  } else {
    // Handle other cases (unauthorized, loading state, etc.)
    return <div>You do not have permission to view this page.</div>
  }

  return (
    <>
        <div>Dashboard Laboran - User logged in</div> 
        {JSON.stringify(session?.user)}
        <button onClick={() => signOut()}>Logout</button>
    </>
  )
}


// 'use client'
// import React from 'react'
// import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") {
//     return <div>Loading...</div> 
//   }

//   if (!session) {
//     // return <Redirect to="/login" />; // Redirect to login if not authenticated
//     router.push('/login');
//     }
    
//   return (
//     <div>Dashboard</div>
//   )
// }
