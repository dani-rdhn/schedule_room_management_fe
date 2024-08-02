'use client'
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from 'next/navigation';

const DashboardPraktikum = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  // Jika tidak ada sesi atau role bukan 'admin' atau 'Praktikum', redirect ke login
  if (!session || (session.user.role !== "admin" && session.user.role !== "Praktikum" && session.user.role !== "praktikum")) {
    redirect("/login");
  }

  return (
    <>
      <Breadcrumb pageName="Dashboard" />

      {/* <!-- ====== Kebutuhan Section Start ====== --> */}
      <div className="w-full max-w-full bg-white border rounded-sm border-stroke shadow-default">
        
      </div>
      {/* <!-- ====== Kebutuhan Section End ====== --> */}
    </>
  );
};

export default DashboardPraktikum;
