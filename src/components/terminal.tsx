'use client'

import {useState, useEffect, useCallback, useContext} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import {useTranslations} from 'next-intl'
import {Terminal as TerminalIcon, X} from 'lucide-react'
import {
  ReactTerminal,
  TerminalContextProvider,
  TerminalContext,
} from 'react-terminal'

function TerminalInner({onClose}: {onClose: () => void}) {
  const t = useTranslations('Terminal')
  const {setBufferedContent} = useContext(TerminalContext)

  const commands = {
    whoami: () => <span style={{whiteSpace: 'pre-wrap'}}>{t('whoami')}</span>,
    skills: () => <span style={{whiteSpace: 'pre-wrap'}}>{t('skills')}</span>,
    projects: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('projects')}</span>
    ),
    motivation: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('motivation')}</span>
    ),
    contact: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('contact')}</span>
    ),
    bewerbung: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('bewerbung')}</span>
    ),
    iam: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('iam')}</span>
    ),
    projekte: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('projekte')}</span>
    ),
    verfügbar: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('verfuegbar')}</span>
    ),
    verfuegbar: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('verfuegbar')}</span>
    ),
    match: () => (
      <span style={{whiteSpace: 'pre-wrap'}}>{t('match')}</span>
    ),
    help: () => <span style={{whiteSpace: 'pre-wrap'}}>{t('help')}</span>,
    exit: () => {
      // Defer the close to after render cycle
      setTimeout(() => {
        setBufferedContent('')
        onClose()
      }, 100)
      return ''
    },
  }

  return (
    <div className="h-full [&>div]:!h-full [&>div>div]:!h-full">
      <ReactTerminal
        commands={commands}
        theme="material-ocean"
        prompt={t('prompt')}
        welcomeMessage={
          <span style={{whiteSpace: 'pre-wrap'}}>{t('greeting')}</span>
        }
        errorMessage={t('unknown', {cmd: ''})}
        showControlBar={false}
        defaultHandler={(cmd: string) => t('unknown', {cmd})}
      />
    </div>
  )
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Terminal')

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

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
              className="w-full max-w-2xl h-[70vh] flex flex-col rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-md py-sm bg-[#0f111a] border-b border-white/10">
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

              {/* Terminal body */}
              <div className="flex-1 overflow-hidden">
                <TerminalContextProvider>
                  <TerminalInner onClose={handleClose} />
                </TerminalContextProvider>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
