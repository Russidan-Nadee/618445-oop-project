"use client";

import React, { useEffect, useState } from 'react';
import { Package, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { getAssetStats } from '@/lib/api/assets';

// --- Sub-Component สำหรับการ์ดสถิติ ---
const StatCard = ({ label, value, icon: Icon, colorClass, bgColor }: any) => (
   <div className="bg-head-bg rounded-xl shadow-sm border border-head-border p-6">
      <div className="flex items-center justify-between">
         <div>
            <p className="text-sm font-medium text-txt-sub uppercase">{label}</p>
            <p className={`text-3xl font-bold mt-2 ${colorClass}`}>{value.toLocaleString()}</p>
         </div>
         <div className={`p-3 rounded-lg ${bgColor || 'bg-brand-soft'}`}>
            <Icon className={`w-8 h-8 ${colorClass}`} />
         </div>
      </div>
   </div>
);

// --- Main Component ---
export default function AssetSummary() {
   const [stats, setStats] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   const fetchStats = async () => {
      try {
         setLoading(true);
         const data = await getAssetStats();
         setStats(data);
      } catch (error) {
         console.error('Failed to fetch stats:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchStats();
   }, []);

   if (loading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="h-32 bg-gray-100 rounded-xl" />
            ))}
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Grid ของการ์ดสถิติ */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
               label="Total Assets"
               value={stats?.total || 0}
               icon={Package}
               colorClass="text-brand"
               bgColor="bg-brand-soft"
            />
            <StatCard
               label="Available Assets"
               value={stats?.available || 0}
               icon={CheckCircle2}
               colorClass="text-green-600"
               bgColor="bg-green-50"
            />
            <StatCard
               label="Borrowed Assets"
               value={stats?.borrowed || 0}
               icon={RefreshCw}
               colorClass="text-orange-600"
               bgColor="bg-orange-50"
            />
            <StatCard
               label="Disabled Assets"
               value={stats?.brokenDisabled || 0}
               icon={XCircle}
               colorClass="text-red-600"
               bgColor="bg-red-50"
            />
         </div>
      </div>
   );
}