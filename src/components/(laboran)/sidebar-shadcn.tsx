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
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Prioritas Kebutuhan', href: '/prioritas-kebutuhan', icon: Archive },
    { label: 'Ruangan', href: '/ruangan', icon: ClipboardList },
    {
      href: '/jadwal-praktikum-laboran',
      icon: CalendarCheck,
      label: 'Jadwal Praktikum',
      // submenu: [ // Tambahkan properti submenu
      //   {  icon: CalendarCheck, label: 'Pemetaan Ruangan', href: '/pemetaan-ruangan' },
      //   { icon: CalendarCheck, label: 'Jadwal Praktikum', href: '/jadwal-praktikum-lab' }, // Contoh submenu baru
      // ]
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