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
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"
import { useMediaQuery } from 'usehooks-ts';
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { SidebarShadcn } from "../sidebar-shadcn";
import { SidebarMobile } from "../sidebar-mobile";
import { SidebarItems } from '@/types/sidebar';
import { SidebarButton } from "../sidebar-button";
// import { NavigationMenuLaboran } from "../Jadwal-praktikum-laboran/NavigationMenu";

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Prioritas Kebutuhan', href: '/prioritas-kebutuhan', icon: Archive },
    { label: 'Ruangan', href: '/ruangan', icon: ClipboardList },
    {
      href: '/jadwal-praktikum-laboran',
      icon: CalendarCheck,
      label: 'Jadwal Praktikum',
    },
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

const Header = (props: {
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
          </Link>
        </div>
{/* 
        <div className="hidden sm:block">
        </div> */}

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

          {/* <div className="ml-4">
            <NavigationMenuLaboran />
          </div> */}

          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
