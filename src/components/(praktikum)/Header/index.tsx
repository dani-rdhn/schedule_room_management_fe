import Link from "next/link";
// import DarkModeSwitcher from "./DarkModeSwitcher";
// import DropdownMessage from "./DropdownMessage";
// import DropdownNotification from "./DropdownNotification";
import {
  ClipboardList,
  CalendarCheck,
  Bell,
  Archive,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { SidebarShadcn } from "../sidebar-shadcn";
import { SidebarMobile } from "../sidebar-mobile";
import { SidebarItems } from '@/types/sidebar';
import { SidebarButton } from "../sidebar-button";

const sidebarItems: SidebarItems = {
  links: [
    // { label: 'Dashboard', href: '/', icon: Home },
    // { label: 'Prioritas Kebutuhan', href: '/prioritas-kebutuhan', icon: Archive },
    // { label: 'Ruangan', href: '/ruangan', icon: ClipboardList },
    // {
    //   href: '/jadwal',
    //   icon: CalendarCheck,
    //   label: 'Jadwal Praktikum',
    // },
    { label: 'Dashboard', href: '/dashboard-praktikum', icon: Home },
    { label: 'Kebutuhan Praktikum', href: '/kebutuhan-praktikum', icon: Archive },
    { label: 'Shift', href: '/shift', icon: ClipboardList },
    { label: 'Jadwal Praktikum', href: '/jadwal-praktikum', icon: ClipboardList },
  ],
  // extras: (
  //   <div className='flex flex-col gap-2'>
  //     <SidebarButton icon={MoreHorizontal} className='w-full'>
  //       More
  //     </SidebarButton>
  //     <SidebarButton
  //       className='w-full justify-center text-white'
  //       variant='default'
  //     >
  //       Tweet
  //     </SidebarButton>
  //   </div>
  // ),
};

const PraktikumHeader = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 flex w-full bg-white z-999 drop-shadow-1">
      <div className="flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
         
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="flex-shrink-0 block lg:hidden" href="/">
            {/* <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            /> */}
          </Link>
        </div>

        <div className="hidden sm:block">
          {/* <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 -translate-y-1/2 top-1/2">
                <svg
                  className="fill-body hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full pr-4 font-medium bg-transparent pl-9 focus:outline-none xl:w-125"
              />
            </div>
          </form> */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}

            {/* <DarkModeSwitcher /> */}
            
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}

            {/* <DropdownNotification /> */}
            
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}

            {/* <DropdownMessage /> */}

            {/* <!-- Chat Notification Area --> */}
          </ul>
          {/* <SidebarShadcn /> */}
          
          <div className="block lg:hidden p-4">
            <SidebarMobile sidebarItems={sidebarItems} />
          </div>

          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default PraktikumHeader;
