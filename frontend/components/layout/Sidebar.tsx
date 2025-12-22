"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Box, History, Users } from 'lucide-react';

const menuItems = [
   { name: 'Dashboard', href: '/', icon: LayoutDashboard },
   { name: 'Assets', href: '/assets', icon: Box },
   { name: 'History', href: '/history', icon: History },
   { name: 'Admin', href: '/log', icon: Users },
];

export default function Sidebar() {
   const pathname = usePathname();

   return (
      <aside className="w-64 bg-side-bg text-txt-white h-screen flex flex-col shrink-0">
         <div className="p-6 text-2xl font-bold border-b border-side-border tracking-tight">
            Asset Admin
         </div>
         <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
               const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
               return (
                  <Link
                     key={item.name}
                     href={item.href}
                     className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                ${isActive
                           ? 'bg-brand text-txt-white shadow-md'
                           : 'text-side-text hover:bg-side-border hover:text-txt-white'
                        }`}
                  >
                     <item.icon size={20} />
                     <span className="font-medium">{item.name}</span>
                  </Link>
               );
            })}
         </nav>
      </aside>
   );
}