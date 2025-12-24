"use client";

import AssetSummary from "@/components/features/dashboard/AssetSummary";
import RecentTransactions from "@/components/features/dashboard/RecentTransactions";
import BorrowedTrend from "@/components/features/dashboard/BorrowedTrend";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Asset Summary at the top */}
      <AssetSummary />

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent Transactions */}
        <RecentTransactions />

        {/* Right: Borrowed Trend */}
        <BorrowedTrend />
      </div>
    </div>
  );
}