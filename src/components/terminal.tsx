'use client'

import {useState, useEffect, useRef, useCallback} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {useTranslations} from 'next-intl'

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

  // Custom event listener for TerminalHint trigger
  useEffect(() => {
    function handleToggle() {
      setIsOpen(true)
    }
    window.addEventListener('toggle-terminal', handleToggle)
    return () => window.removeEventListener('toggle-terminal', handleToggle)
  }, [])

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

      setLines((prev) => [...prev, {type: 'input', text: `> ${cmd.trim()}`}])

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-backdrop"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          className="fixed inset-0 z-[60] flex items-end justify-center p-md md:p-xl bg-black/60"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            key="terminal-window"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 0.2}}
            className="bg-[#1a1a2e] rounded-lg border border-border max-w-2xl w-full max-h-[60vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-xs px-md py-sm border-b border-border/50">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-text-secondary text-sm font-mono ml-sm">
                tobias@bitmarck
              </span>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-md font-mono text-sm"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === 'input'
                      ? 'text-green-400'
                      : 'text-green-300/80 whitespace-pre-wrap'
                  }
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-sm px-md py-sm border-t border-border/50 font-mono text-sm">
              <span className="text-green-400 shrink-0">{t('prompt')}</span>
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
                className="bg-transparent border-none outline-none flex-1 text-green-400 font-mono text-sm caret-green-400"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function TerminalHint() {
  const t = useTranslations('Footer')

  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal'))}
      className="mt-sm text-xs text-text-secondary/60 hover:text-text-secondary transition-colors cursor-pointer"
    >
      {t('terminalHint')}
    </button>
  )
}
