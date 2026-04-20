'use client';

import {Sparkles} from 'lucide-react';
import {motion} from 'motion/react';
import {useRouter} from '@/i18n/navigation';

export function InteractiveFab() {
  const router = useRouter();

  return (
    <div className="fixed bottom-md left-md z-50 group">
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-sm px-sm py-xs rounded-lg bg-text-primary text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Interaktiv entdecken
      </div>

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/20"
        animate={{scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6]}}
        transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
      />

      {/* Button */}
      <motion.button
        onClick={() => router.push('/interaktiv')}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover hover:shadow-xl transition-all duration-200"
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
        aria-label="Interaktiv entdecken"
      >
        <Sparkles className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
