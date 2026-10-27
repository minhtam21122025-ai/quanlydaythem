import React from 'react';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export interface BannerStatItem {
  label: string;
  value: string | number;
  unit?: string;
  sublabel?: string;
  sub?: string;
  tone?: 'default' | 'emerald' | 'rose' | 'amber';
  highlight?: boolean;
}

export interface BannerTabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface SectionBannerProps {
  title: string;
  subtitle: string;
  kicker?: string;
  badge?: string;
  icon: LucideIcon;
  onBack?: () => void;
  actions?: React.ReactNode;
  stats?: BannerStatItem[];
  tabs?: BannerTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const SectionBanner: React.FC<SectionBannerProps> = ({
  title,
  subtitle,
  kicker,
  icon: Icon,
  onBack,
  actions,
  stats,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const effectiveKicker = kicker || 'HỆ THỐNG QUẢN LÝ HOÀNG GIA';

  return (
    <div className="space-y-4 w-full">
      {/* Main Deep Emerald Header Card (Matching Image 2) */}
      <div className="w-full rounded-3xl bg-gradient-to-br from-[#065f46] via-[#075e46] to-[#054d3b] p-5 sm:p-7 lg:p-8 text-white shadow-sm border border-emerald-900/40 overflow-hidden">
        {onBack && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 min-h-[34px] px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-emerald-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ</span>
            </button>
          </div>
        )}

        {/* Top Row: Frosted Icon Tile + Kicker + Uppercase Title + Subtitle */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200/90">
              {effectiveKicker}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold tracking-tight text-white uppercase leading-tight mt-0.5">
              {title}
            </h2>
            <p className="text-sm sm:text-[15px] text-emerald-50/90 mt-1.5 leading-relaxed font-medium w-full">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Hairline Divider & Action Buttons + 4 Stat Cards Inside Green Banner */}
        {(actions || (stats && stats.length > 0)) && (
          <div className="mt-6 pt-5 border-t border-white/15 space-y-5">
            {actions && (
              <div className="flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4',
                  stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                )}
              >
                {stats.map((stat, idx) => {
                  const valueColorClass =
                    stat.tone === 'emerald'
                      ? 'text-emerald-300'
                      : stat.tone === 'rose'
                      ? 'text-rose-300'
                      : stat.tone === 'amber'
                      ? 'text-amber-300'
                      : 'text-white';

                  const subText = stat.sublabel || stat.sub;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/[0.08] border border-white/15 px-4 py-4 sm:px-5 sm:py-4.5 flex flex-col justify-between"
                    >
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-emerald-100/85">
                        {stat.label}
                      </p>
                      <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                        <span
                          className={cn(
                            'text-2xl sm:text-[26px] font-extrabold tabular-nums tracking-tight leading-none',
                            valueColorClass
                          )}
                        >
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="text-xs sm:text-sm font-semibold text-emerald-50/90">
                            {stat.unit}
                          </span>
                        )}
                      </div>
                      {subText && !stat.unit && (
                        <p className="text-[11px] font-medium text-emerald-100/75 mt-1.5 truncate">
                          {subText}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Segmented Sub-Navigation Tabs Below the Banner */}
      {tabs && tabs.length > 0 && onTabChange && (
        <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors shrink-0',
                  isActive
                    ? 'bg-[#0b6e4f] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-800 dark:hover:text-white'
                )}
              >
                {TabIcon && <TabIcon className="w-4 h-4 shrink-0" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SectionBanner;
