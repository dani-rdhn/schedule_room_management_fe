// import Ruangan from "@/components/(laboran)/Ruangan";
// import TableRuangan from "@/components/shared/Tables/Ruangan";
// import LaboranLayout from '../layout';
// import RuanganSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import PrioritasKebutuhan from "@/components/(praktikum)/Kebutuhan";
// import JadwalPraktikum from "@/components/(praktikum)/Jadwal";
import JadwalPraktikumLaboran from "@/components/(laboran)/Jadwal-praktikum-laboran";
// import JadwalSection from "./table";
import JadwalSection from "./table";
import { NavigationMenuLaboran } from "@/components/(laboran)/Jadwal-praktikum-laboran/NavigationMenu";
import { DropdownMenuPraktikum } from "@/components/(laboran)/Jadwal-praktikum-laboran/DropdownMenu";
import { NavigationMenuJadwal } from "@/components/(laboran)/Jadwal-praktikum-laboran/JadwalLink";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Praktikum",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
export default function JadwalPraktikumLaboranPage() {

  return (
    <>
      {/* <LaboranLayout> */}
      {/* <Ruangan /> */}
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <RuanganSection /> */}
      {/* <PrioritasKebutuhan /> */}
      
      {/* <NavigationMenuLaboran />
      <DropdownMenuPraktikum /> */}
      <NavigationMenuJadwal />
      <div className="mt-5">
      <JadwalPraktikumLaboran />
      </div>
      <JadwalSection />
      {/* <TableRuangan /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

// export default CalendarPage;
