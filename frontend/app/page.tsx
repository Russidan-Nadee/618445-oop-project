'use client';

import React, { useEffect, useState } from 'react';
import { Package, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { getAssetStats } from '@/lib/api/assets';
import { AssetStats } from '@/types/asset';

export default function DashboardPage() {
  const [stats, setStats] = useState<AssetStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getAssetStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-main-bg">
        <RefreshCw className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Assets */}
          <div className="bg-head-bg rounded-xl shadow-sm border border-head-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-txt-sub uppercase">สินทรัพย์ทั้งหมด</p>
                <p className="text-3xl font-bold text-txt-main mt-2">{stats?.total || 0}</p>
              </div>
              <div className="bg-brand-soft p-3 rounded-lg">
                <Package className="w-8 h-8 text-brand" />
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="bg-head-bg rounded-xl shadow-sm border border-head-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-txt-sub uppercase">พร้อมใช้งาน</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats?.available || 0}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Borrowed */}
          <div className="bg-head-bg rounded-xl shadow-sm border border-head-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-txt-sub uppercase">ถูกยืม</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats?.borrowed || 0}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <RefreshCw className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Broken/Disabled */}
          <div className="bg-head-bg rounded-xl shadow-sm border border-head-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-txt-sub uppercase">ชำรุด/ปิดใช้งาน</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats?.brokenDisabled || 0}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 bg-brand text-txt-white px-4 py-2 rounded-lg hover:opacity-90 transition shadow-sm font-semibold"
          >
            <RefreshCw className="w-4 h-4" />
            รีเฟรชข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}