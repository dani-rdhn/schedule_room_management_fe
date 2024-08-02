// import Ruangan from "@/components/(laboran)/Ruangan";
// import TableRuangan from "@/components/shared/Tables/Ruangan";
// import LaboranLayout from '../layout';
// import RuanganSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Shift from "@/components/(laboran)/Shift";
import ShiftSection from "./table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shift Praktikum",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
export default function ShiftPage() {
  // const { data: session, status } = useSession();

  // if (status === 'loading') return <div>Loading...</div> // Handle loading state

  // if (!session) {
  //   // router.push('/auth/login'); // Redirect to login if no session
  //   // return null;
  //   redirect('/auth/login');

  // }

  return (
    <>
      {/* <LaboranLayout> */}
      <Shift />
      <ShiftSection />
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <RuanganSection /> */}
      {/* <TableRuangan /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

// export default CalendarPage;
