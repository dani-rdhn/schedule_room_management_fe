// import Ruangan from "@/components/(laboran)/Ruangan";
// import TableRuangan from "@/components/shared/Tables/Ruangan";
// import LaboranLayout from '../layout';
// import RuanganSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import PrioritasKebutuhan from "@/components/(praktikum)/Kebutuhan";
import JadwalPraktikum from "@/components/(praktikum)/Jadwal";
import JadwalSection from "./table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Praktikum",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
export default function JadwalPraktikumPage() {

  return (
    <>
      {/* <LaboranLayout> */}
      {/* <Ruangan /> */}
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <RuanganSection /> */}
      {/* <PrioritasKebutuhan /> */}
      <JadwalPraktikum />
      <JadwalSection />
      {/* <TableRuangan /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

// export default CalendarPage;
