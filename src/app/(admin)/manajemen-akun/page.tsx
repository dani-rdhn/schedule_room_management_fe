import ManajemenAkun from "@/components/(superadmin)/Manajemen-akun";
import ManajemenAkunSection from "./table";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
// import { FormManajemenAkunDialog } from "@/components/(superadmin)/Manajemen-akun/formManajemenAkun";
import { FormCreateAkun } from "@/components/(superadmin)/Manajemen-akun/formCreateAkun";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ManajemenAkun",
  description: "",
  // other metadata
};
// const PrioritasPage = () => {
// export default function ManajemenAkunPage() {
const ManajemenAkunPage = () => {
  // const { data: session, status } = useSession();
  return (
    <>
      {/* <LaboranLayout> */}
      <ManajemenAkun />
      {/* <FormCreateAkun /> */}
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <FormManajemenAkunDialog /> */}
      <ManajemenAkunSection />
      {/* <TableManajemenAkun /> */}
      {/* </LaboranLayout> */}
    </>
  );
};

export default ManajemenAkunPage;
