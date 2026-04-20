import {type ReactNode} from 'react';

type TagProps = {
  children: ReactNode;
  variant?: 'default' | 'outline';
};

export function Tag({children, variant = 'default'}: TagProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-label font-medium transition-all duration-200 cursor-default select-none ${
      variant === 'outline'
        ? 'border border-accent/40 text-accent bg-accent/[0.06] hover:bg-accent/8 hover:border-accent/40 hover:shadow-[0_0_8px_rgba(37,99,235,0.15)]'
        : 'bg-accent/15 text-accent border border-accent/20 hover:bg-accent/14 hover:shadow-[0_0_8px_rgba(37,99,235,0.15)]'
    }`}>
      {children}
    </span>
  );
}
