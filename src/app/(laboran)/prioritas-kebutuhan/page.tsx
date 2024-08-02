import Kebutuhan from "@/components/(laboran)/Prioritas-kebutuhan";
// import TableKebutuhan from "@/components/shared/Tables/Kebutuhan";
import PrioritasSection from "./table";
// import LaboranLayout from '../layout';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebutuhan",
  description: "",
  // other metadata
};

const PrioritasPage = () => {
    
  return (
    <>
      <Kebutuhan />
      {/* <TableKebutuhan /> */}
      <PrioritasSection />
    </>
  );
};

export default PrioritasPage;
