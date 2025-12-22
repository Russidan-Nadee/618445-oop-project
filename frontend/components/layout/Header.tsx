"use client";
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { menuConfig } from '@/config/menu';

export default function Header() {
   const pathname = usePathname();
   const pathSegments = pathname.split('/').filter(Boolean);

   const getLabel = (segment: string) => {
      return menuConfig.labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
   };

   return (
      <header className="h-16 bg-head-bg border-b border-head-border flex items-center justify-between px-8 sticky top-0 z-40 w-full">

         {/* Left Side: Breadcrumbs Navigation */}
         <nav className="flex items-center text-sm">
            <span className="text-txt-sub hover:text-brand cursor-pointer transition-colors font-medium">
               Main
            </span>

            {pathSegments.length > 0 ? (
               pathSegments.map((segment, index) => {
                  const isLast = index === pathSegments.length - 1;
                  return (
                     <div key={index} className="flex items-center">
                        <ChevronRight size={14} className="mx-2.5 text-txt-sub/30" />
                        <span className={`transition-colors ${isLast ? 'text-brand font-bold' : 'text-txt-sub hover:text-txt-main font-medium'
                           }`}>
                           {getLabel(segment)}
                        </span>
                     </div>
                  );
               })
            ) : (
               <div className="flex items-center">
                  <ChevronRight size={14} className="mx-2.5 text-txt-sub/30" />
                  <span className="font-bold text-brand">{menuConfig.defaultTitle}</span>
               </div>
            )}
         </nav>

         {/* Right Side: Profile Section */}
         <div className="flex items-center">
            <button className="flex items-center gap-3 pl-4 pr-1 py-1 rounded-2xl hover:bg-main-bg transition-all duration-200 group border border-transparent hover:border-head-border">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-txt-main leading-none group-hover:text-brand transition-colors">
                     Admin User
                  </p>
                  <p className="text-[10px] text-txt-sub mt-1.5 uppercase tracking-[0.1em] font-bold opacity-80">
                     Administrator
                  </p>
               </div>

               <div className="relative">
                  <div className="w-10 h-10 bg-brand-soft text-brand rounded-xl flex items-center justify-center font-bold border-2 border-transparent group-hover:border-brand/20 transition-all">
                     AD
                  </div>
                  {/* Status Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-head-bg rounded-full"></span>
               </div>
            </button>
         </div>

      </header>
   );
}