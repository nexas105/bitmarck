import {type ReactNode} from 'react';

type TagProps = {
  children: ReactNode;
};

export function Tag({children}: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-subtle px-md py-sm text-label text-text-secondary">
      {children}
    </span>
  );
}
