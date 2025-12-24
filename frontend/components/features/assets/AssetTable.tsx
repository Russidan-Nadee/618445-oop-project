"use client";

import { useState, useEffect } from "react";
import {
   Laptop,
   Hash,
   Tag,
   Loader2,
   Plus,
   Calendar,
   RotateCcw,
   Handshake,
   MessageSquare
} from "lucide-react";
import { getAssets } from "@/lib/api/assets";
import { borrowAsset, returnAsset } from "@/lib/api/transactions";
import { Asset, AssetStatus } from "@/types/asset";
import CreateAssetDialog from "./CreateAssetDialog";

const CURRENT_USER_ID = 1;

export default function AssetTable() {
   const [assets, setAssets] = useState<Asset[]>([]);
   const [loading, setLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
   const [note, setNote] = useState("");
   const [processingId, setProcessingId] = useState<number | null>(null);

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

   const openConfirmDialog = (asset: Asset) => {
      setSelectedAsset(asset);
      setNote("");
      setIsConfirmOpen(true);
   };

   const handleExecuteAction = async () => {
      if (!selectedAsset) return;

      setProcessingId(selectedAsset.id);
      const payload = {
         userId: CURRENT_USER_ID,
         assetId: selectedAsset.id,
         note: note.trim() || `Transaction via Asset Dashboard`
      };

      try {
         if (selectedAsset.status === AssetStatus.AVAILABLE) {
            await borrowAsset(payload);
            setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, status: AssetStatus.BORROWED } : a));
         } else {
            await returnAsset(payload);
            setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, status: AssetStatus.AVAILABLE } : a));
         }
         setIsConfirmOpen(false);
      } catch (error) {
         console.error("Transaction error:", error);
         alert("Transaction failed. Please try again.");
      } finally {
         setProcessingId(null);
         setSelectedAsset(null);
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
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-txt-main">Asset Inventory</h1>
               <p className="text-sm text-txt-sub font-medium">Manage and track your company assets</p>
            </div>
            <button
               onClick={() => setIsDialogOpen(true)}
               className="bg-brand text-txt-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all text-sm flex items-center gap-2 shadow-lg shadow-brand/20 cursor-pointer"
            >
               <Plus size={18} /> Add New Asset
            </button>
         </div>

         {/* Table */}
         <div className="bg-head-bg border border-head-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-main-bg border-b border-head-border text-txt-sub">
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-txt-sub">Asset Details</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-txt-sub">Category</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-center text-txt-sub">Purchase Date</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-center text-txt-sub">Status</th>
                        <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right text-txt-sub">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-head-border">
                     {loading ? (
                        <tr><td colSpan={5} className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-brand" /></td></tr>
                     ) : assets.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-txt-sub font-medium">No assets found</td></tr>
                     ) : assets.map((asset) => {
                        const isAvailable = asset.status === AssetStatus.AVAILABLE;
                        const isBorrowed = asset.status === AssetStatus.BORROWED;
                        return (
                           <tr key={asset.id} className="hover:bg-main-bg/50 transition-colors">
                              <td className="p-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-soft text-brand rounded-xl flex items-center justify-center shrink-0">
                                       <Laptop size={18} />
                                    </div>
                                    <div>
                                       <p className="text-sm font-bold text-txt-main">{asset.name}</p>
                                       <p className="text-[10px] text-txt-sub flex items-center gap-1 font-mono uppercase tracking-tight">
                                          <Hash size={10} /> {asset.serialNumber}
                                       </p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-4 font-semibold text-xs text-txt-main">
                                 <div className="flex items-center gap-1.5">
                                    <Tag size={12} className="text-brand" /> {asset.type?.name || `Type ${asset.typeId}`}
                                 </div>
                              </td>
                              <td className="p-4 text-center text-xs text-txt-sub">
                                 {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString('en-US', { dateStyle: 'medium' }) : '-'}
                              </td>
                              <td className="p-4 text-center">
                                 <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block uppercase tracking-wider ${getStatusStyles(asset.status)}`}>
                                    {asset.status}
                                 </span>
                              </td>
                              <td className="p-4 text-right">
                                 <div className="flex justify-end">
                                    <button
                                       onClick={() => openConfirmDialog(asset)}
                                       disabled={!isAvailable && !isBorrowed}
                                       className={`min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed
                                          ${isAvailable ? "bg-brand text-txt-white shadow-md shadow-brand/10 active:scale-95"
                                             : isBorrowed ? "bg-head-bg border-2 border-brand text-brand hover:bg-brand-soft active:scale-95"
                                                : "bg-main-bg text-txt-sub border border-head-border opacity-40"}`}
                                    >
                                       {isAvailable ? <><Handshake size={14} /> Borrow</> : isBorrowed ? <><RotateCcw size={14} /> Return</> : "Unavailable"}
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>

         {/* --- Action Confirmation Dialog --- */}
         {isConfirmOpen && selectedAsset && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-head-bg w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-head-border overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-8 space-y-6">
                     {/* Icon & Title */}
                     <div className="text-center space-y-4">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner 
                           ${selectedAsset.status === AssetStatus.AVAILABLE ? 'bg-brand-soft text-brand' : 'bg-status-ok-bg text-status-ok'}`}>
                           {selectedAsset.status === AssetStatus.AVAILABLE ? <Handshake size={40} /> : <RotateCcw size={40} />}
                        </div>
                        <div className="space-y-1">
                           <h2 className="text-2xl font-black text-txt-main tracking-tight">
                              {selectedAsset.status === AssetStatus.AVAILABLE ? "Confirm Borrow" : "Confirm Return"}
                           </h2>
                           <p className="text-sm text-txt-sub font-medium leading-relaxed px-2">
                              You are performing this action for <span className="text-brand font-bold">"{selectedAsset.name}"</span>
                           </p>
                        </div>
                     </div>

                     {/* Note Input */}
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-txt-sub uppercase tracking-wider flex items-center gap-2 px-1">
                           <MessageSquare size={12} /> Note (Optional)
                        </label>
                        <textarea
                           value={note}
                           onChange={(e) => setNote(e.target.value)}
                           placeholder="Type transaction note here..."
                           className="w-full bg-main-bg border border-head-border rounded-2xl p-4 text-sm text-txt-main focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none h-24"
                        />
                     </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex border-t border-head-border bg-main-bg/50">
                     <button
                        onClick={() => setIsConfirmOpen(false)}
                        className="flex-1 p-5 text-sm font-bold text-txt-sub hover:bg-main-bg transition-colors border-r border-head-border cursor-pointer"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleExecuteAction}
                        disabled={!!processingId}
                        className={`flex-1 p-5 text-sm font-extrabold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer
                           ${selectedAsset.status === AssetStatus.AVAILABLE ? 'text-brand hover:bg-brand-soft' : 'text-status-ok hover:bg-status-ok-bg'}`}
                     >
                        {processingId ? <Loader2 size={18} className="animate-spin" /> : "Confirm Action"}
                     </button>
                  </div>
               </div>
            </div>
         )}

         <CreateAssetDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSuccess={loadAssets} />
      </div>
   );
}