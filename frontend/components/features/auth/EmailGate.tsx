"use client";

import { useState, useEffect } from "react";
import { getUserByEmail } from "@/lib/api/users";
import { User } from "@/types/users";

export default function EmailGate({ children }: { children: React.ReactNode }) {
   const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [isChecking, setIsChecking] = useState<boolean>(true);

   useEffect(() => {
      // เช็คว่าเคยล็อคอินไว้หรือยัง
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) {
         setIsAuthorized(true);
      }
      setIsChecking(false);
   }, []);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
         // เรียก API ตรวจสอบอีเมลเฉพาะบุคคล
         const user = await getUserByEmail(email.trim());

         if (user && user.email) {
            // บันทึกข้อมูลทั้งหมดลง localStorage
            localStorage.setItem("user_id", String(user.id));
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_name", user.fullName);
            localStorage.setItem("user_role", user.role);

            setIsAuthorized(true);
         }
      } catch (error) {
         console.error("Login Error:", error);
         alert("ไม่พบอีเมลนี้ในระบบ หรือเกิดข้อผิดพลาดในการเชื่อมต่อ");
      } finally {
         setLoading(false);
      }
   };

   // ช่วงที่กำลังเช็ค localStorage ให้หน้าจอว่างไว้ก่อน
   if (isChecking) return <div className="h-screen bg-white" />;

   // ถ้ายังไม่ได้รับอนุญาต ให้แสดงหน้า Form ยืนยันตัวตน
   if (!isAuthorized) {
      return (
         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
               <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800">ยืนยันตัวตน</h1>
                  <p className="text-gray-500 mt-2 text-sm">กรุณากรอกอีเมลเพื่อเข้าสู่ระบบ</p>
               </div>

               <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                     <input
                        type="email"
                        required
                        placeholder="admin@example.com"
                        className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-all disabled:bg-gray-400 shadow-md"
                  >
                     {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
                  </button>
               </form>
            </div>
         </div>
      );
   }

   // หากผ่านแล้ว จะแสดงผล Sidebar + Header + Content ตามปกติ
   return <>{children}</>;
}