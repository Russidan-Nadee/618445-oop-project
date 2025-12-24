"use client";

import HistoryTable from "@/components/features/history/HistoryTable";

export default function HistoryPage() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold text-txt-main mb-6">Transaction History</h1>
         <HistoryTable />
      </div>
   );
}