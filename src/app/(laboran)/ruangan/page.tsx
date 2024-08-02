import Ruangan from "@/components/(laboran)/Ruangan";
// import TableRuangan from "@/components/shared/Tables/Ruangan";
// import LaboranLayout from '../layout';
import RuanganSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { FormRuanganDialog } from "@/components/(laboran)/Ruangan/formRuangan";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruangan",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
export default function RuanganPage() {
  // const { data: session, status } = useSession();
  return (
    <>
      {/* <LaboranLayout> */}
      <Ruangan />
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <FormRuanganDialog /> */}
      <RuanganSection />
      {/* <TableRuangan /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

// export default CalendarPage;
