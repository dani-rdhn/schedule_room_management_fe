// import MainPage from "@/components/shared/Dashboard/main";
import MainPage from "@/components/shared/Dashboard/MainPage";
import { Metadata } from "next";
import axios from "axios";
import { useState } from 'react';
// import { signIn, signOut, useSession, Session } from 'next-auth/react'; 
// import Cookies from 'js-cookie';
import IndexPage from "@/components/(mainpage)";

axios.defaults.withCredentials = true;

export const metadata: Metadata = {
  title: "Aplikasi Pemetaan dan Penjadwalan Praktikum",
  description: "",
  // other metadata
};

export default function Home() {
  return (
    <>
      <IndexPage />
      {/* <MainPage /> */}
    </>
  );
}
