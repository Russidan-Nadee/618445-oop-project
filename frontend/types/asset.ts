export enum AssetStatus {
   AVAILABLE = 'AVAILABLE',
   BORROWED = 'BORROWED',
   BROKEN = 'BROKEN',
   DISABLED = 'DISABLED',
}

export interface AssetType {
   id: number;
   name: string;
}

export interface Asset {
   id: number;
   name: string;
   serialNumber: string;
   status: AssetStatus;
   purchaseDate: string;
   typeId: number;
   type: AssetType;
}

export interface AssetStats {
   total: number;
   available: number;
   borrowed: number;
   brokenDisabled: number;
}