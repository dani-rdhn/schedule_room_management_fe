'use client'

// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import { redirect, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Re-introduce useSession
import { Suspense } from 'react';

export default function Ruangan() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  // Jika tidak ada sesi atau role bukan 'admin' atau 'laboran', redirect ke login
  if (!session || (session.user.role !== "admin" && session.user.role !== "laboran")) {
    redirect("/login");
  }

  return (
    <>
      <Breadcrumb pageName="Ruangan" />

       <div className="w-full max-w-full bg-white border rounded-sm border-stroke shadow-default">
        
       </div>
      {/* Konten halaman Ruangan di sini */}
      {/* ... (komponen-komponen lain yang Anda gunakan) */}
    </>
  );
}

// export default function Ruangan() {
//   // const { data: session, status } = useSession();
//   // const router = useRouter();
//   // const { data: session, status } = useSession();
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === 'loading') return <div>Loading...</div> // Handle loading state

//   if (!session) {
//     // router.push('/auth/login'); // Redirect to login if no session
//     // return null;
//     redirect('/login');
//   }

//   const userRole = session.user.role; 

//   if (!session || !session.user) {
//     // Redirect to login if not logged in
//     redirect('/login');
//   } else if (session.user.role !== 'admin' && session.user.role !== 'laboran') {
//     // Redirect to login if role is not 'admin' or 'laboran'
//     redirect('/login');
//   }
  
//   return (
//     <>
//       <Breadcrumb pageName="Ruangan" />

//       {/* <!-- ====== Ruangan Section Start ====== --> */}
//       <div className="w-full max-w-full bg-white border rounded-sm border-stroke shadow-default">
        
//       </div>
//       {/* <!-- ====== Ruangan Section End ====== --> */}
//     </>
//   );
// };

