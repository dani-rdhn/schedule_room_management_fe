'use client'
// import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from 'next/navigation';
import { RoomOccupancy, AverageOccupancy, OccupancyMetrics } from "@/types/dashboard";

const DashboardLaboran = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  // Jika tidak ada sesi atau role bukan 'admin' atau 'laboran', redirect ke login
  if (!session || (session.user.role !== "admin" && session.user.role !== "laboran" && session.user.role !== "praktikum")) {
    redirect("/login");
  }

  return (
    <>
      <Breadcrumb pageName="" />

      {/* <!-- ====== Kebutuhan Section Start ====== --> */}
      <div className="w-full max-w-full bg-white border rounded-sm border-stroke shadow-default">
        
      </div>
      {/* <!-- ====== Kebutuhan Section End ====== --> */}
    </>
  );
};

export default DashboardLaboran;
