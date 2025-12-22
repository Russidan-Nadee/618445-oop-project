"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, LogOut } from 'lucide-react';
import { menuConfig } from '@/config/menu';

export default function Header() {
   const pathname = usePathname();
   const pathSegments = pathname.split('/').filter(Boolean);

   const [user, setUser] = useState({
      name: 'Guest',
      role: 'User',
      initials: 'GS'
   });

   useEffect(() => {
      const name = localStorage.getItem("user_name") || "Unknown User";
      const role = localStorage.getItem("user_role") || "Guest";
      const initials = name
         .split(' ')
         .map(n => n[0])
         .join('')
         .toUpperCase()
         .slice(0, 2);

      setUser({ name, role, initials });
   }, []);

   const handleLogout = () => {
      if (confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
         localStorage.clear();
         window.location.reload();
      }
   };

   const getLabel = (segment: string) => {
      return menuConfig.labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
   };

   return (
      <header className="h-20 bg-head-bg border-b border-head-border flex items-center justify-between px-8 sticky top-0 z-40 w-full">

         {/* Left Side: Breadcrumbs Navigation - ขยายเป็น text-lg (18px) */}
         <nav className="flex items-center text-lg">
            <span className="text-txt-sub hover:text-brand cursor-pointer transition-colors font-semibold">
               Main
            </span>

            {pathSegments.length > 0 ? (
               pathSegments.map((segment, index) => {
                  const isLast = index === pathSegments.length - 1;
                  return (
                     <div key={index} className="flex items-center">
                        <ChevronRight size={20} className="mx-3 text-txt-sub/30" />
                        <span className={`transition-colors ${isLast ? 'text-brand font-bold' : 'text-txt-sub hover:text-txt-main font-semibold'
                           }`}>
                           {getLabel(segment)}
                        </span>
                     </div>
                  );
               })
            ) : (
               <div className="flex items-center">
                  <ChevronRight size={20} className="mx-3 text-txt-sub/30" />
                  <span className="font-bold text-brand">{menuConfig.defaultTitle}</span>
               </div>
            )}
         </nav>

         {/* Right Side: Profile & Logout Section */}
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  {/* ชื่อผู้ใช้ปรับเป็น text-lg */}
                  <p className="text-lg font-bold text-txt-main leading-tight transition-colors">
                     {user.name}
                  </p>
                  {/* บทบาทปรับเป็น text-sm (14px) เพื่อให้อ่านออกชัดเจน */}
                  <p className="text-sm text-txt-sub mt-1 uppercase tracking-wider font-bold opacity-90">
                     {user.role}
                  </p>
               </div>

               <div className="relative">
                  {/* ขยาย Avatar เป็น w-12 h-12 และตัวอักษรข้างในเป็น text-xl */}
                  <div className="w-12 h-12 bg-brand-soft text-brand rounded-xl flex items-center justify-center text-xl font-bold border-2 border-transparent shadow-sm">
                     {user.initials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-head-bg rounded-full"></span>
               </div>
            </div>

            {/* Logout Button ขยายไอคอนเป็น size 24 */}
            <button
               onClick={handleLogout}
               className="p-3 text-txt-sub hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
               title="Logout"
            >
               <LogOut size={24} />
            </button>
         </div>

      </header>
   );
}