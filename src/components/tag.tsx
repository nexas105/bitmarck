import {type ReactNode} from 'react';

type TagProps = {
  children: ReactNode;
  variant?: 'default' | 'outline';
};

export function Tag({children, variant = 'default'}: TagProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-label font-medium transition-colors duration-150 ${
      variant === 'outline'
        ? 'border border-accent/20 text-accent hover:bg-accent/5'
        : 'bg-accent/8 text-accent hover:bg-accent/12'
    }`}>
      {children}
    </span>
  );
}
