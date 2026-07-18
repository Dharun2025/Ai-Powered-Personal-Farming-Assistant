import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-slate-800 rounded ${className}`} />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 flex flex-col gap-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 flex flex-col gap-4">
      <Skeleton className="h-6 w-1/4" />
      <div className="h-48 w-full flex items-end gap-3 pt-6">
        <Skeleton className="h-[20%] flex-1" />
        <Skeleton className="h-[50%] flex-1" />
        <Skeleton className="h-[80%] flex-1" />
        <Skeleton className="h-[40%] flex-1" />
        <Skeleton className="h-[60%] flex-1" />
        <Skeleton className="h-[90%] flex-1" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-8 w-1/6" />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
