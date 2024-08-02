'use client'
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from 'next/navigation';
import { ToastContainer } from "react-toastify";

const ManajemenAkun = () => {
  const { data: session, status } = useSession();

  // if (status === "loading") return <div>Loading...</div>;

  // Jika tidak ada sesi atau role bukan 'admin' atau 'laboran', redirect ke login
  if (!session || (session.user.role !== "admin" && session.user.role !== "laboran")) {
    redirect("/login");
  }

  return (
    <>
      <Breadcrumb pageName="Manajemen Akun" />

      {/* <!-- ====== Manajemen Akun Section Start ====== --> */}
      <div className="w-full max-w-full bg-white border rounded-sm border-stroke shadow-default">
      <ToastContainer />  
      
      </div>
      {/* <!-- ====== Manajemen Akun Section End ====== --> */}
    </>
  );
};

export default ManajemenAkun;
