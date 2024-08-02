'use client';

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
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types/sidebar';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Dashboard', href: '/dashboard-praktikum', icon: Home },
    { label: 'Kebutuhan Praktikum', href: '/kebutuhan-praktikum', icon: Archive },
    // { label: 'Shift', href: '/shift', icon: ClipboardList },
    { label: 'Jadwal Praktikum', href: '/jadwal-praktikum', icon: ClipboardList },
    // {
    //   href: '/jadwal',
    //   icon: CalendarCheck,
    //   label: 'Jadwal Praktikum',
    // },
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

export function SidebarShadcn() {
  const isDesktop = useMediaQuery('(min-width: 1024px)', {
    initializeWithValue: false,
  });

  // if (isDesktop) {
  //   return <SidebarDesktop sidebarItems={sidebarItems} />;
  // }

  return isDesktop ? ( 
        <SidebarDesktop sidebarItems={sidebarItems} /> 
    ) : (
        <SidebarMobile sidebarItems={sidebarItems} /> 
    );

}