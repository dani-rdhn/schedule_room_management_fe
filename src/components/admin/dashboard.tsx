'use client';
import React from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import ProtectedPages from '../protected';

// eslint-disable-next-line @next/next/no-async-client-component
export default function DashboardAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div>Loading...</div> // Handle loading state

  // if (!session) {
  //   router.push('/login'); // Redirect to login if no session
  //   return null;
  // }
  
  if (!session) {
    return <><ProtectedPages/></>
  }

  const userRole = session.user.role; 

  // if (session && session.user.role === 'admin') {
  //   // Render content for admins
  //   return <div>Admin-only content</div>;
  // } else {
  //   // Handle other cases (unauthorized, loading state, etc.)
  //   return <div>You do not have permission to view this page.</div>
  // }

  // Redirect if the user is not an admin
  // if (userRole !== 'admin') {
  //   router.push('/unauthorized'); // Or another suitable page
  //   return null; 
  // }
  
  if (session && session.user.role !== 'admin') {
    // return <p>Access Denied</p>
    redirect('/login')
  }

  return (
    <>
        <div>Dashboard Admin - User logged in</div> 
        {session && session.user.role === 'admin' && (
          <div>Admin-only content</div>
        )}
        <button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
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
