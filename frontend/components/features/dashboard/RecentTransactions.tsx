"use client";

import { useEffect, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { getTransactions } from "@/lib/api/transactions";
import type { Transaction } from "@/types/transaction";

export default function RecentTransactions() {
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchTransactions();
   }, []);

   const fetchTransactions = async () => {
      try {
         setLoading(true);
         setError(null);
         const data = await getTransactions();
         // Get only the latest 10 transactions
         setTransactions(data.slice(0, 10));
      } catch (err) {
         console.error("Failed to fetch transactions:", err);
         setError("Failed to load transactions");
      } finally {
         setLoading(false);
      }
   };

   const formatDate = (date: string) => {
      return new Date(date).toLocaleString("th-TH", {
         day: "2-digit",
         month: "short",
         year: "numeric",
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   return (
      <div className="bg-white rounded-lg shadow p-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <button
               onClick={fetchTransactions}
               className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
               disabled={loading}
            >
               {loading ? "Loading..." : "Refresh"}
            </button>
         </div>

         {loading ? (
            <div className="space-y-3">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-50 rounded">
                     <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                     <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                     </div>
                  </div>
               ))}
            </div>
         ) : error ? (
            <div className="text-center py-8">
               <p className="text-red-500 mb-2">{error}</p>
               <button
                  onClick={fetchTransactions}
                  className="text-sm text-blue-600 hover:text-blue-700"
               >
                  Try Again
               </button>
            </div>
         ) : transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
         ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
               {transactions.map((transaction) => (
                  <div
                     key={transaction.id}
                     className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                  >
                     {/* Icon */}
                     <div className={`mt-1 ${transaction.action === "borrow"
                           ? "text-orange-500"
                           : "text-green-500"
                        }`}>
                        {transaction.action === "borrow" ? (
                           <ArrowUpCircle className="w-6 h-6" />
                        ) : (
                           <ArrowDownCircle className="w-6 h-6" />
                        )}
                     </div>

                     {/* Content */}
                     <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                           <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                 {transaction.asset?.name || "Unknown Asset"}
                                 {transaction.asset?.serialNumber && (
                                    <span className="text-sm text-gray-500 ml-2">
                                       ({transaction.asset.serialNumber})
                                    </span>
                                 )}
                              </p>
                              <p className="text-sm text-gray-600">
                                 {transaction.action === "borrow" ? "ยืมโดย" : "คืนโดย"}{" "}
                                 <span className="font-medium">
                                    {transaction.user?.fullName || "Unknown User"}
                                 </span>
                              </p>
                              {transaction.note && (
                                 <p className="text-xs text-gray-500 mt-1 italic">
                                    {transaction.note}
                                 </p>
                              )}
                           </div>
                           <span className="text-xs text-gray-400 whitespace-nowrap">
                              {formatDate(transaction.actionDate)}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}