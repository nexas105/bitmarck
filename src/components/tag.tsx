import {type ReactNode} from 'react';

type TagProps = {
  children: ReactNode;
};

export function Tag({children}: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-md py-sm text-label text-accent font-medium">
      {children}
    </span>
  );
}
