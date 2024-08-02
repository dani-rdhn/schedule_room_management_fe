import React from 'react'
import Dashboard from '@/components/dashboard';
import DashboardLaboran from '@/components/laboran/dashboard';
import { Metadata } from "next";
import DashboardLaboranSection from './section';

export const metadata: Metadata = {
  title: "Dashboard Laboran",
  description: "",
  // other metadata
};

export default function DashboardLaboranPage() {
  return (
    <>
        {/* <div>DashboardAdminPage</div> */}
        {/* <DashboardLaboran /> */}
        <DashboardLaboranSection />
    </>
  )
}
