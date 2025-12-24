"use client";

import { useState, useEffect } from "react";
import { getUserByEmail, createUser } from "@/lib/api/users";
import { User } from "@/types/users";

export default function EmailGate({ children }: { children: React.ReactNode }) {
   const [isAuthorized, setIsAuthorized] = useState(false);
   const [isRegistering, setIsRegistering] = useState(false);
   const [loading, setLoading] = useState(false);
   const [isChecking, setIsChecking] = useState(true);

   const [email, setEmail] = useState("");
   const [fullName, setFullName] = useState("");

   useEffect(() => {
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) setIsAuthorized(true);
      setIsChecking(false);
   }, []);

   const saveUserToLocal = (user: User) => {
      localStorage.setItem("user_id", String(user.id));
      localStorage.setItem("user_email", user.email);
      localStorage.setItem("user_name", user.fullName);
      localStorage.setItem("user_role", user.role);
      setIsAuthorized(true);
   };

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const user = await getUserByEmail(email.trim());
         if (user) {
            saveUserToLocal(user);
         } else {
            alert("Email not found in system.");
         }
      } catch (error) {
         alert("Verification failed. Please check your connection.");
      } finally {
         setLoading(false);
      }
   };

   const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const newUser = await createUser({
            fullName: fullName.trim(),
            email: email.trim(),
            role: 'USER'
         });
         saveUserToLocal(newUser);
      } catch (error) {
         alert("Failed to create account. Email might already exist.");
      } finally {
         setLoading(false);
      }
   };

   if (isChecking) return <div className="h-screen bg-main-bg" />;

   if (!isAuthorized) {
      return (
         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-main-bg p-4 font-sans">
            <div className="w-full max-w-sm bg-head-bg p-8 rounded-2xl shadow-sm border border-head-border">
               <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-txt-main">
                     {isRegistering ? "Create Account" : "Identity Verification"}
                  </h1>
                  <p className="text-xs text-txt-sub mt-2 font-medium">
                     {isRegistering ? "Enter your details to register" : "Enter your email to continue"}
                  </p>
               </div>

               <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                  {isRegistering && (
                     <div>
                        <label className="block text-[10px] font-bold text-txt-sub uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                           type="text"
                           required
                           placeholder="John Doe"
                           className="w-full p-3 border border-head-border rounded-xl outline-none focus:ring-2 focus:ring-brand bg-head-bg text-txt-main transition-all placeholder:text-txt-sub/40"
                           value={fullName}
                           onChange={(e) => setFullName(e.target.value)}
                        />
                     </div>
                  )}

                  <div>
                     <label className="block text-[10px] font-bold text-txt-sub uppercase tracking-wider mb-1.5">Email Address</label>
                     <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full p-3 border border-head-border rounded-xl outline-none focus:ring-2 focus:ring-brand bg-head-bg text-txt-main transition-all placeholder:text-txt-sub/40"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>

                  <div className="pt-4 space-y-3">
                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand text-txt-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all disabled:bg-txt-sub/50 shadow-sm"
                     >
                        {loading ? "Processing..." : (isRegistering ? "Sign Up" : "Confirm Identity")}
                     </button>

                     {!isRegistering ? (
                        <button
                           type="button"
                           onClick={() => setIsRegistering(true)}
                           className="w-full bg-brand-soft text-brand font-bold py-3.5 rounded-xl hover:bg-brand/10 transition-all"
                        >
                           Create New Account
                        </button>
                     ) : (
                        <button
                           type="button"
                           onClick={() => setIsRegistering(false)}
                           className="w-full text-sm text-txt-sub hover:text-brand text-center font-bold"
                        >
                           Back to Login
                        </button>
                     )}
                  </div>
               </form>
            </div>
         </div>
      );
   }

   return <>{children}</>;
}