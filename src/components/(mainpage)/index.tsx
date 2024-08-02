'use client'

import { useSession, getSession } from 'next-auth/react';
// import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react'; 
import { redirect }  from 'next/navigation'

const IndexPage = () => {
//   const router = useRouter();
    const { data: session, status } = useSession();

    if (status === 'loading') return; // Loading state

    // const session = await getSession();

    if (!session) {
        redirect('/login');  // Redirect to login if not logged in
    } else {
        const userRole = session.user.role;

        if (userRole === 'admin') {
            redirect('/manajemen-akun');
        } else if (userRole === 'laboran') {
            redirect('/prioritas-kebutuhan');
        } else if (userRole === 'praktikum') {
            redirect('/kebutuhan-praktikum');
        } else {
            console.error('Role tidak dikenal');
        }
    }

        // checkSessionAndRedirect();

  // Show loading state while session is being checked
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

  // Replace with your actual index page content
  return (
    <div>
      <h1>Welcome to your App</h1>
    </div>
  );
};

export default IndexPage;
