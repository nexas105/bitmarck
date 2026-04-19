'use client'

import {useState, useEffect, useRef, useCallback} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {useTranslations} from 'next-intl'
import {Terminal as TerminalIcon, X} from 'lucide-react'

type TerminalLine = {
  type: 'input' | 'output'
  text: string
}

const COMMANDS = ['whoami', 'skills', 'projects', 'motivation', 'contact', 'help'] as const

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const t = useTranslations('Terminal')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcut: Ctrl+` to toggle, Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Auto-focus input when opened + show greeting
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setLines((prev) =>
        prev.length === 0
          ? [{type: 'output', text: t('greeting')}]
          : prev
      )
    }
  }, [isOpen, t])

  // Scroll to bottom when lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      if (!trimmed) return

      setLines((prev) => [...prev, {type: 'input', text: `${t('prompt')} ${cmd.trim()}`}])

      if (trimmed === 'clear') {
        setLines([])
      } else if (trimmed === 'exit') {
        setIsOpen(false)
        setLines([])
      } else if ((COMMANDS as readonly string[]).includes(trimmed)) {
        setLines((prev) => [...prev, {type: 'output', text: t(trimmed as typeof COMMANDS[number])}])
      } else {
        setLines((prev) => [...prev, {type: 'output', text: t('unknown', {cmd: trimmed})}])
      }
      setInput('')
    },
    [t]
  )

  return (
    <>
      {/* FAB - Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-lg right-lg z-50 h-14 w-14 rounded-full bg-accent shadow-lg flex items-center justify-center text-white hover:bg-accent-hover transition-colors duration-150"
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
        aria-label={t('fabLabel')}
      >
        <TerminalIcon className="h-6 w-6" />
      </motion.button>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-backdrop"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.15}}
            className="fixed inset-0 z-[60] flex items-end justify-center p-md md:p-xl bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              key="terminal-window"
              initial={{opacity: 0, y: 40, scale: 0.95}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 40, scale: 0.95}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="w-full max-w-[42rem] max-h-[70vh] flex flex-col rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar — glassmorphism */}
              <div className="flex items-center justify-between px-md py-sm bg-[#0d1117] border-b border-white/10">
                <div className="flex items-center gap-sm">
                  <div className="flex gap-xs">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
                      aria-label="Close"
                    />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[#8b949e] text-xs font-mono ml-sm">
                    tobias@bitmarck ~ zsh
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8b949e] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Output area — dark theme */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-md bg-[#0d1117] font-mono text-[13px] leading-relaxed"
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === 'input'
                        ? 'text-[#58a6ff] mb-xs'
                        : 'text-[#c9d1d9] whitespace-pre-wrap mb-sm'
                    }
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Input row */}
              <div className="flex items-center gap-sm px-md py-sm bg-[#0d1117] border-t border-white/10 font-mono text-[13px]">
                <span className="text-[#58a6ff] shrink-0">{t('prompt')}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(input)
                    }
                  }}
                  className="bg-transparent border-none outline-none flex-1 text-[#c9d1d9] font-mono text-[13px] caret-[#58a6ff] placeholder:text-[#484f58]"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Type a command..."
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
