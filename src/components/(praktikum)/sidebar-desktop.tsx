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
  User,
  Users,
} from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/types/sidebar';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
// import { auth } from '@/auth';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

// eslint-disable-next-line @next/next/no-async-client-component
export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Get session data
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  if (!session || !session.user) return null;

  return (
    <aside className={`h-screen fixed left-0 top-0 z-40 border-r ${isCollapsed ? 'w-20' : 'w-72'} duration-300 ease-linear lg:static lg:translate-x-0 bg-[#1C2434]`}>
      <div className='h-full px-3 py-4'>
        <div className='flex justify-between items-center'>
          <h3 className={`text-lg ml-3 font-semibold text-foreground text-[#DEE4E8] ${isCollapsed ? 'hidden' : 'block'}`}>Aplikasi Praktikum</h3>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className={` text-[#DEE4E8] ${isCollapsed ? 'ml-3' : 'mr-4'}`}>
            {isCollapsed ? <Menu /> : <Menu />}
          </button>
        </div>
        <div className='mt-5'>
          <div className={`flex flex-col gap-5 w-full pt-10 text-[#DEE4E8]`}>
            <Separator className='mt-1' />
            
            <span className={`px-3 text-sm font-semibold text-gray-500 ${isCollapsed ? 'hidden' : 'block'}`}>
              Master Data
            </span>
            <Link href="/kebutuhan-praktikum">
              <SidebarButton
                variant={pathname === '/kebutuhan-praktikum' ? 'secondary' : 'ghost'}
                icon={Archive}
                className='w-full text-md'
              >
                {isCollapsed ? null : 'Kebutuhan Praktikum'}
              </SidebarButton>
            </Link>

            <Separator className='mt-1'/>

            <span className={`px-3 text-sm font-semibold text-gray-500 ${isCollapsed ? 'hidden' : 'block'}`}>
              Transactional Data
            </span>
            <Link href="/jadwal-praktikum">
              <SidebarButton
                variant={pathname === '/jadwal-praktikum' ? 'secondary' : 'ghost'}
                icon={CalendarCheck}
                className='w-full text-md'
              >
                {isCollapsed ? null : 'Jadwal Praktikum'}
              </SidebarButton>
            </Link>
          </div>
          <div className='absolute left-0 bottom-3 w-full px-3 mb-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start text-white'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2 items-center'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://github.com/max-programming.png' />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                      <span className={`text-[#DEE4E8] text-[14px] whitespace-normal ${isCollapsed ? 'hidden' : 'block'}`}>{session?.user?.name ?? 'Unknown User'}</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                <div className='space-y-1'>
                  {/* <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full'>
                      {isCollapsed ? null : 'Account Settings'}
                    </SidebarButton>
                  </Link> */}
                  <SidebarButton size='sm' icon={LogOut} className='w-full' onClick={() => signOut({ callbackUrl: '/login' })}>
                    {isCollapsed ? null : 'Log Out'}
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}