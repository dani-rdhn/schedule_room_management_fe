// import Ruangan from "@/components/(laboran)/Ruangan";
// import TableRuangan from "@/components/shared/Tables/Ruangan";
// import LaboranLayout from '../layout';
// import RuanganSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import PrioritasKebutuhan from "@/components/(praktikum)/Kebutuhan";
// import JadwalPraktikum from "@/components/(praktikum)/Jadwal";
// import JadwalPraktikumLaboran from "@/components/(laboran)/Jadwal-praktikum-laboran";
import PemetaanRuangan from "@/components/(laboran)/Pemetaan-ruangan";
// import JadwalSection from "./table";
import JadwalSection from "./table";
import { NavigationMenuLaboran } from "@/components/(laboran)/Jadwal-praktikum-laboran/NavigationMenu";
import { NavigationMenuJadwal } from "@/components/(laboran)/Pemetaan-ruangan/JadwalLink";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemetaan Ruangan",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
export default function PemetaanRuanganPage() {
  // const { data: session, status } = useSession();

  // if (!session || session.user.role !== "laboran") {
  //   redirect("/login");
  // }

  return (
    <>
      {/* <LaboranLayout> */}
      {/* <Ruangan /> */}
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <RuanganSection /> */}
      {/* <PrioritasKebutuhan /> */}
      
      <NavigationMenuJadwal />
      {/* <NavigationMenuLaboran /> */}
      <div className="mt-5">
        {/* <JadwalPraktikumLaboran /> */}
        <PemetaanRuangan />
      </div>
      <JadwalSection />
      {/* <TableRuangan /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

// export default CalendarPage;
