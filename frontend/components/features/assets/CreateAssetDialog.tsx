"use client";

import { useState, useEffect } from "react";
import { X, Laptop, Hash, Layers, Plus } from "lucide-react";
import { createAsset } from "@/lib/api/assets";
import { getAssetTypes, createAssetType } from "@/lib/api/asset-types";
import { AssetStatus, AssetType } from "@/types/asset";

interface Props {
   isOpen: boolean;
   onClose: () => void;
   onSuccess: () => void;
}

export default function CreateAssetDialog({ isOpen, onClose, onSuccess }: Props) {
   const [loading, setLoading] = useState(false);
   const [types, setTypes] = useState<AssetType[]>([]);
   const [isAddingType, setIsAddingType] = useState(false);
   const [newTypeName, setNewTypeName] = useState("");

   const [formData, setFormData] = useState({
      name: "",
      serialNumber: "",
      status: AssetStatus.AVAILABLE,
      purchaseDate: new Date().toISOString().split("T")[0],
      typeId: 0,
   });

   useEffect(() => {
      if (isOpen) {
         getAssetTypes().then(data => {
            setTypes(data);
            if (data.length > 0) {
               setFormData(p => ({ ...p, typeId: data[0].id }));
            }
         });
      }
   }, [isOpen]);

   if (!isOpen) return null;

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         await createAsset(formData as any);
         onSuccess();
         onClose();
      } finally {
         setLoading(false);
      }
   };

   const handleAddType = async () => {
      if (!newTypeName.trim()) return;

      const newType = await createAssetType({ name: newTypeName });
      setTypes(prev => [...prev, newType]);
      setFormData(prev => ({ ...prev, typeId: newType.id }));
      setNewTypeName("");
      setIsAddingType(false);
   };

   const inputClass =
      "w-full p-3 bg-main-bg border border-head-border rounded-xl outline-none focus:ring-2 focus:ring-brand text-txt-main text-sm transition-all";

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
         <div
            className="absolute inset-0 bg-side-bg/60 backdrop-blur-sm"
            onClick={onClose}
         />

         <div className="relative bg-head-bg w-full max-w-lg rounded-2xl shadow-2xl border border-head-border overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-head-border">
               <h2 className="text-xl font-bold text-txt-main">New Asset</h2>
               <button onClick={onClose} className="text-txt-sub hover:text-txt-main">
                  <X size={20} />
               </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
               {/* Asset Name */}
               <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold text-txt-sub uppercase mb-2">
                     <Laptop size={14} className="text-brand" />
                     Asset Name
                  </label>
                  <input
                     type="text"
                     required
                     className={inputClass}
                     value={formData.name}
                     onChange={e =>
                        setFormData({ ...formData, name: e.target.value })
                     }
                  />
               </div>

               {/* Serial */}
               <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold text-txt-sub uppercase mb-2">
                     <Hash size={14} className="text-brand" />
                     Serial Number
                  </label>
                  <input
                     type="text"
                     required
                     className={inputClass}
                     value={formData.serialNumber}
                     onChange={e =>
                        setFormData({ ...formData, serialNumber: e.target.value })
                     }
                  />
               </div>

               {/* Category */}
               <div>
                  <div className="flex items-center justify-between mb-2">
                     <label className="flex items-center gap-2 text-[10px] font-bold text-txt-sub uppercase">
                        <Layers size={14} className="text-brand" />
                        Asset Type
                     </label>

                     {!isAddingType && (
                        <button
                           type="button"
                           onClick={() => setIsAddingType(true)}
                           className="flex items-center gap-1 text-xs text-brand hover:underline"
                        >
                           <Plus size={12} /> Add type
                        </button>
                     )}
                  </div>

                  <select
                     className={inputClass}
                     value={formData.typeId}
                     onChange={e =>
                        setFormData({
                           ...formData,
                           typeId: Number(e.target.value),
                        })
                     }
                  >
                     {types.map(t => (
                        <option key={t.id} value={t.id}>
                           {t.name}
                        </option>
                     ))}
                  </select>

                  {isAddingType && (
                     <div className="mt-3 flex gap-2">
                        <input
                           type="text"
                           placeholder="New asset type name"
                           className={inputClass}
                           value={newTypeName}
                           onChange={e => setNewTypeName(e.target.value)}
                        />
                        <button
                           type="button"
                           onClick={handleAddType}
                           className="px-4 bg-brand text-txt-white rounded-xl text-sm font-bold"
                        >
                           Save
                        </button>
                        <button
                           type="button"
                           onClick={() => {
                              setIsAddingType(false);
                              setNewTypeName("");
                           }}
                           className="px-4 border border-head-border rounded-xl text-sm"
                        >
                           Cancel
                        </button>
                     </div>
                  )}
               </div>

               {/* Actions */}
               <div className="flex gap-3 pt-6 border-t border-head-border">
                  <button
                     type="button"
                     onClick={onClose}
                     className="flex-1 py-3 border border-head-border text-txt-sub font-bold rounded-xl hover:bg-main-bg"
                  >
                     Cancel
                  </button>
                  <button
                     disabled={loading}
                     className="flex-1 py-3 bg-brand text-txt-white font-bold rounded-xl shadow-lg shadow-brand/20 disabled:opacity-50"
                  >
                     {loading ? "Saving..." : "Save Asset"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
