"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getTransactionTrend } from "@/lib/api/transactions";
import { TrendData } from "@/types/transaction"; // ปรับ path ตามที่คุณเก็บ types ไว้

export default function BorrowedTrend() {
   const [data, setData] = useState<TrendData[]>([]);
   const [loading, setLoading] = useState(true);
   const [period, setPeriod] = useState<"7" | "30">("30");

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            // เรียกใช้ api จริงแทนการ mock
            const result = await getTransactionTrend(parseInt(period));
            setData(result);
         } catch (error) {
            console.error("Failed to fetch trend data:", error);
            setData([]); // ในกรณี error ให้เคลียร์ data เพื่อโชว์ "No data available"
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [period]);

   const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("th-TH", {
         day: "2-digit",
         month: "short",
      });
   };

   const totalBorrowed = data.reduce((sum, item) => sum + item.borrowed, 0);
   const totalReturned = data.reduce((sum, item) => sum + item.returned, 0);

   return (
      <div className="bg-white rounded-lg shadow p-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Borrowed Trend</h2>

            {/* Period Selector */}
            <div className="flex gap-2">
               <button
                  onClick={() => setPeriod("7")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${period === "7"
                     ? "bg-blue-500 text-white"
                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                     }`}
               >
                  7 Days
               </button>
               <button
                  onClick={() => setPeriod("30")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${period === "30"
                     ? "bg-blue-500 text-white"
                     : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                     }`}
               >
                  30 Days
               </button>
            </div>
         </div>

         {loading ? (
            <div className="h-[400px] flex items-center justify-center">
               <div className="animate-pulse text-gray-400">Loading chart...</div>
            </div>
         ) : data.length === 0 ? (
            <div className="h-[400px] flex items-center justify-center">
               <p className="text-gray-500">No data available</p>
            </div>
         ) : (
            <>
               {/* Summary Stats */}
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-orange-50 rounded-lg p-4">
                     <p className="text-sm text-gray-600">Total Borrowed</p>
                     <p className="text-2xl font-bold text-orange-600">
                        {totalBorrowed}
                     </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                     <p className="text-sm text-gray-600">Total Returned</p>
                     <p className="text-2xl font-bold text-green-600">
                        {totalReturned}
                     </p>
                  </div>
               </div>

               {/* Chart */}
               <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                     <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        stroke="#888"
                        style={{ fontSize: '12px' }}
                     />
                     <YAxis
                        stroke="#888"
                        style={{ fontSize: '12px' }}
                     />
                     <Tooltip
                        contentStyle={{
                           backgroundColor: 'white',
                           border: '1px solid #e5e7eb',
                           borderRadius: '8px',
                        }}
                        labelFormatter={(label) => `Date: ${formatDate(label)}`}
                     />
                     <Legend
                        wrapperStyle={{ fontSize: '14px' }}
                     />
                     <Line
                        type="monotone"
                        dataKey="borrowed"
                        stroke="#f97316"
                        strokeWidth={2}
                        name="Borrowed"
                        dot={{ fill: '#f97316', r: 4 }}
                        activeDot={{ r: 6 }}
                     />
                     <Line
                        type="monotone"
                        dataKey="returned"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Returned"
                        dot={{ fill: '#22c55e', r: 4 }}
                        activeDot={{ r: 6 }}
                     />
                  </LineChart>
               </ResponsiveContainer>
            </>
         )}
      </div>
   );
}