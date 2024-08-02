'use client';

import { SidebarItems } from '@/types/sidebar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { Button } from '@/components/ui/button';
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession, signIn, signOut } from "next-auth/react"

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Get session data
  // const session = await auth()
  
  if (!session || !session.user) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4' hideClose>
      {/* <SheetContent side='left' className='px-3 py-4'> */}
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <span className='text-lg font-semibold text-foreground mx-3 text-[#DEE4E8]'>
            Aplikasi Praktikum
          </span>
          <SheetClose asChild>
            <Button className='h-7 w-7 p-0' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className='h-full'>
          <div className='flex flex-col gap-5 w-full pt-10 text-[#DEE4E8]'>
              {/* Master Data */}
              {/* <Link href="/">
                <SidebarButton
                  variant={pathname === '/' ? 'secondary' : 'ghost'}
                  icon={Home}
                  className='w-full text-xl'
                >
                  Dashboard
                </SidebarButton>
              </Link>
             */}
              {/* Separator */}
              <Separator className='mt-1' />
              
              <span className='px-3 text-md font-semibold text-gray-500'>
               Master Data
              </span>
              <Link href="/prioritas-kebutuhan">
                <SidebarButton
                  variant={pathname === '/prioritas-kebutuhan' ? 'secondary' : 'ghost'}
                  icon={Archive}
                  className='w-full text-xl'
                >
                  Prioritas Kebutuhan
                </SidebarButton>
              </Link>
              <Link href="/ruangan">
                <SidebarButton
                  variant={pathname === '/ruangan' ? 'secondary' : 'ghost'}
                  icon={ClipboardList}
                  className='w-full text-xl'
                >
                  Ruangan
                </SidebarButton>
              </Link>
              <Link href="/shift">
                <SidebarButton
                  variant={pathname === '/shift' ? 'secondary' : 'ghost'}
                  icon={ClipboardList}
                  className='w-full text-xl'
                >
                  Shift
                </SidebarButton>
              </Link>

              {/* Separator */}
              <Separator className='mt-1'/>

              <span className='px-3 text-md font-semibold text-gray-500'>
                Transactional Data
              </span>
              {/* Transactional Data */}
              <Link href="/jadwal-praktikum-laboran">
                <SidebarButton
                  variant={pathname === '/jadwal-praktikum-laboran' ? 'secondary' : 'ghost'}
                  icon={CalendarCheck}
                  className='w-full text-xl'
                >
                  Jadwal Praktikum
                </SidebarButton>
              </Link>
            </div>
          {/* <div className='mt-12 flex flex-col w-full gap-1 text-[#DEE4E8]'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  icon={link.icon}
                  className='w-full text-lg py-2'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div> */}
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='ghost' className='w-full justify-start text-white'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2 items-center'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://github.com/max-programming.png' />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                        <span className='text-[#DEE4E8] text-md whitespace-normal w-[200px]'>{session?.user?.name ?? 'Unknown User'}</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className='mb-2 p-2 text-[#DEE4E8]'>
                <div className='flex flex-col space-y-2 mt-2'>
                  <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full text-[#1C2434] text-md'>
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className='w-full text-[#1C2434] text-md' onClick={() => signOut({ callbackUrl: '/login' })}>
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}