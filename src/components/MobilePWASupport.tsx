import React, { useState, useEffect } from 'react';
import {
  WifiOff,
  Home,
  Users,
  GraduationCap,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const OfflineNoticeBar: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Đang ở chế độ ngoại tuyến (Offline) — Dữ liệu vẫn được lưu an toàn trên thiết bị.</span>
    </div>
  );
};

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home, matches: ['dashboard'] },
    { id: 'students_group', label: 'Học sinh', icon: Users, matches: ['students_group', 'students-list', 'students-export'] },
    { id: 'student_learning_group', label: 'Học tập', icon: GraduationCap, matches: ['student_learning_group'] },
    { id: 'finance_group', label: 'Tài chính', icon: DollarSign, matches: ['finance_group', 'finance-config', 'finance-ledger', 'finance-vouchers'] },
    { id: 'tax_report', label: 'Thuế HKD', icon: FileSpreadsheet, matches: ['tax_report'] },
  ];

  return (
    <nav
      aria-label="Điều hướng di động"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-14 px-1">
        {navItems.map((item) => {
          const isActive = item.matches.includes(activeTab);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-lg transition-colors active:bg-emerald-50/70 dark:active:bg-slate-800',
                isActive
                  ? 'text-[#0b6e4f] dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
              <span className="text-[10px] leading-tight tracking-tight truncate max-w-full px-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
