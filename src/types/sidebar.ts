import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

// export interface SidebarItems {
//   links: { 
//     label: string; 
//     href: string; 
//     icon?: LucideIcon;  // Optional icon
//     submenu?: {
//       icon?: LucideIcon;
//       label: string;
//       href: string;
//     }[] 
//   }[];
//   extras?: React.ReactNode;
// }