'use client';
import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import { useEffect, useState } from 'react';

// eslint-disable-next-line @next/next/no-async-client-component
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  console.log('Session Data:', session);

  //  useEffect(() => {
  //   const fetchRole = async () => {
  //     if (session) {
  //       const response = await fetch('http://localhost:5000/me', {
  //         headers: {
  //           // Include necessary authentication headers 
  //           // (if your API requires authentication)
  //         }
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserRole(data.role);

  //         console.log("Role fetched:", data.role);
  //       } else {
  //         // Handle error (log, display message, etc.)
  //       }
  //     }
  //   };

  //   fetchRole();
  // }, [session]);

  if (status === 'loading') return <div>Loading...</div> // Handle loading state

  if (!session) {
    redirect('/login')
    // router.push('/login'); // Redirect to login if no session
    // return null;
  }

  return (
    <>
        <div>Dashboard - User logged in</div> 
        {JSON.stringify(session?.user)}
        <button onClick={() => signOut()}>Logout</button>
        {console.log('Session Data:', session)} 
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
