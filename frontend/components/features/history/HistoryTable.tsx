"use client";

import { useState, useEffect } from "react";
import {
   ArrowUpRight,
   ArrowDownLeft,
   Calendar,
   User,
   Laptop,
   Loader2,
   MessageSquare,
   Clock
} from "lucide-react";
import { getTransactions } from "@/lib/api/transactions";
import { Transaction } from "@/types/transaction";

export default function HistoryTable() {
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      getTransactions()
         .then(setTransactions)
         .catch((err) => console.error("Failed to load history", err))
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return (
         <div className="bg-head-bg border border-head-border rounded-2xl p-20 flex flex-col items-center justify-center text-txt-sub">
            <Loader2 className="animate-spin mb-3 text-brand" size={32} />
            <p className="text-sm font-bold uppercase tracking-widest">Loading History...</p>
         </div>
      );
   }

   return (
      <div className="bg-head-bg border border-head-border rounded-2xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-main-bg border-b border-head-border">
                     <th className="p-4 text-[10px] font-bold text-txt-sub uppercase tracking-widest">Action</th>
                     <th className="p-4 text-[10px] font-bold text-txt-sub uppercase tracking-widest">Asset & User</th>
                     <th className="p-4 text-[10px] font-bold text-txt-sub uppercase tracking-widest">Timestamp</th>
                     <th className="p-4 text-[10px] font-bold text-txt-sub uppercase tracking-widest">Note</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-head-border font-sans">
                  {transactions.length > 0 ? (
                     transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-main-bg/30 transition-colors group">
                           {/* Action Badge */}
                           <td className="p-4">
                              <div className="flex">
                                 {tx.action === 'borrow' ? (
                                    <div className="flex items-center gap-1.5 text-status-err font-bold text-[10px] uppercase bg-status-err-bg px-2.5 py-1 rounded-lg border border-status-err/10">
                                       <ArrowUpRight size={14} /> Borrowed
                                    </div>
                                 ) : (
                                    <div className="flex items-center gap-1.5 text-status-ok font-bold text-[10px] uppercase bg-status-ok-bg px-2.5 py-1 rounded-lg border border-status-ok/10">
                                       <ArrowDownLeft size={14} /> Returned
                                    </div>
                                 )}
                              </div>
                           </td>

                           {/* Asset & User Info - เปลี่ยนจาก ID เป็น Name */}
                           <td className="p-4">
                              <div className="space-y-1">
                                 <div className="flex items-center gap-2 text-sm font-bold text-txt-main">
                                    <Laptop size={14} className="text-brand" />
                                    {tx.asset?.name || `Asset #${tx.assetId}`}
                                 </div>
                                 <div className="flex items-center gap-2 text-[11px] text-txt-sub">
                                    <User size={12} />
                                    {tx.user?.fullName || `User #${tx.userId}`}
                                 </div>
                              </div>
                           </td>

                           {/* Date & Time */}
                           <td className="p-4">
                              <div className="space-y-1">
                                 <div className="flex items-center gap-1.5 text-xs font-semibold text-txt-main">
                                    <Calendar size={12} className="text-txt-sub" />
                                    {new Date(tx.actionDate).toLocaleDateString()}
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[10px] text-txt-sub">
                                    <Clock size={12} />
                                    {new Date(tx.actionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                 </div>
                              </div>
                           </td>

                           {/* Notes */}
                           <td className="p-4">
                              {tx.note ? (
                                 <div className="flex items-start gap-1.5 text-xs text-txt-sub italic max-w-[200px] truncate">
                                    <MessageSquare size={12} className="mt-0.5 shrink-0" />
                                    {tx.note}
                                 </div>
                              ) : (
                                 <span className="text-txt-sub/20 text-[10px] tracking-widest">— NO NOTE —</span>
                              )}
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={4} className="p-16 text-center text-txt-sub text-sm font-medium">
                           No transaction history available.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}