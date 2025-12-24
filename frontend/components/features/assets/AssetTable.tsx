"use client";

import { useState, useEffect } from "react";
import {
   Laptop,
   Trash2,
   Hash,
   Tag,
   Loader2,
   Plus,
   AlertTriangle,
   Calendar
} from "lucide-react";
import { getAssets, deleteAsset } from "@/lib/api/assets";
import { Asset, AssetStatus } from "@/types/asset";
import CreateAssetDialog from "./CreateAssetDialog";

export default function AssetTable() {
   const [assets, setAssets] = useState<Asset[]>([]);
   const [loading, setLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [assetToDelete, setAssetToDelete] = useState<{ id: number, name: string } | null>(null);
   const [isDeleting, setIsDeleting] = useState(false);

   const loadAssets = async () => {
      setLoading(true);
      try {
         const data = await getAssets();
         setAssets(data);
      } catch (error) {
         console.error("Failed to load assets:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => { loadAssets(); }, []);

   const confirmDelete = (id: number, name: string) => {
      setAssetToDelete({ id, name });
      setIsDeleteModalOpen(true);
   };

   const handleExecuteDelete = async () => {
      if (!assetToDelete) return;
      setIsDeleting(true);
      try {
         await deleteAsset(assetToDelete.id);
         setAssets(prev => prev.filter(asset => asset.id !== assetToDelete.id));
         setIsDeleteModalOpen(false);
         setAssetToDelete(null);
      } catch (error) {
         alert("ไม่สามารถลบข้อมูลได้");
      } finally {
         setIsDeleting(false);
      }
   };

   const getStatusStyles = (status: AssetStatus) => {
      switch (status) {
         case AssetStatus.AVAILABLE: return "bg-status-ok-bg text-status-ok border-status-ok/20";
         case AssetStatus.BORROWED: return "bg-brand-soft text-brand border-brand/20";
         case AssetStatus.BROKEN: return "bg-status-err-bg text-status-err border-status-err/20";
         case AssetStatus.DISABLED: return "bg-main-bg text-txt-sub border-head-border opacity-60";
         default: return "bg-main-bg text-txt-sub border-head-border";
      }
   };

   return (
      <div className="w-full space-y-4 font-sans relative">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-txt-main">Assets</h1>
               <p className="text-sm text-txt-sub font-medium">Total {assets.length} items</p>
            </div>
            <button
               onClick={() => setIsDialogOpen(true)}
               className="bg-brand text-txt-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all text-sm flex items-center gap-2 shadow-lg shadow-brand/20"
            >
               <Plus size={18} /> Add New Asset
            </button>
         </div>

         <div className="bg-head-bg border border-head-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-main-bg border-b border-head-border text-txt-sub">
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Details & Serial</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Type</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-center">Purchase Date</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-center">Status</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-head-border">
                     {loading ? (
                        <tr><td colSpan={5} className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-brand" /></td></tr>
                     ) : assets.map((asset) => (
                        <tr key={asset.id} className="hover:bg-main-bg transition-colors group">
                           {/* Name & Serial */}
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-brand-soft text-brand rounded-xl flex items-center justify-center shrink-0">
                                    <Laptop size={18} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-txt-main">{asset.name}</p>
                                    <p className="text-[10px] text-txt-sub uppercase flex items-center gap-1 font-mono">
                                       <Hash size={10} /> {asset.serialNumber}
                                    </p>
                                 </div>
                              </div>
                           </td>

                           {/* Asset Type */}
                           <td className="p-4">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-txt-main">
                                 <Tag size={12} className="text-brand" />
                                 {asset.type?.name || `Type ${asset.typeId}`}
                              </div>
                           </td>

                           {/* Purchase Date */}
                           <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-txt-sub">
                                 <Calendar size={12} />
                                 {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : '-'}
                              </div>
                           </td>

                           {/* Status */}
                           <td className="p-4 text-center">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block ${getStatusStyles(asset.status)}`}>
                                 {asset.status}
                              </span>
                           </td>

                           {/* Action */}
                           <td className="p-4 text-right">
                              <button
                                 onClick={() => confirmDelete(asset.id, asset.name)}
                                 className="p-2.5 hover:bg-status-err-bg text-txt-sub hover:text-status-err rounded-xl transition-all active:scale-95"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Delete Confirmation Modal (กลางจอ) */}
         {isDeleteModalOpen && (
            <div
               className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
               onClick={() => setIsDeleteModalOpen(false)}
            >
               <div
                  className="bg-head-bg w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-head-border overflow-hidden animate-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="p-8 text-center space-y-4">
                     <div className="w-20 h-20 bg-status-err-bg text-status-err rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                        <AlertTriangle size={40} />
                     </div>
                     <div className="space-y-1">
                        <h2 className="text-2xl font-black text-txt-main tracking-tight">ยืนยันการลบ?</h2>
                        <p className="text-sm text-txt-sub font-medium leading-relaxed px-4">
                           คุณแน่ใจใช่ไหมที่จะลบ <span className="text-status-err font-bold">"{assetToDelete?.name}"</span>? ระบบจะทำลายข้อมูลนี้ถาวร
                        </p>
                     </div>
                  </div>
                  <div className="flex border-t border-head-border bg-main-bg/50">
                     <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="flex-1 p-5 text-sm font-bold text-txt-sub hover:bg-main-bg transition-colors border-r border-head-border"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleExecuteDelete}
                        disabled={isDeleting}
                        className="flex-1 p-5 text-sm font-extrabold text-status-err hover:bg-status-err-bg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                     >
                        {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Delete Now"}
                     </button>
                  </div>
               </div>
            </div>
         )}

         <CreateAssetDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSuccess={loadAssets} />
      </div>
   );
}