import { useAppContext } from '../context/AppContext';
import { cn } from '@/lib/utils';

export default function Header() {
  const { state, dispatch } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl">
      {/* Top row: Logo + Controls */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-neutral-900 sm:w-[18px] sm:h-[18px]">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Zorvyn
          </h1>
        </div>

        {/* Desktop Nav — hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/60 dark:border-white/[0.06] rounded-xl p-1">
          {(['dashboard', 'transactions', 'insights'] as const).map(tab => (
            <button
              key={tab}
              id={`nav-${tab}`}
              onClick={() => dispatch({ type: 'SET_TAB', payload: tab })}
              className={cn(
                'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 capitalize',
                state.activeTab === tab
                  ? 'bg-white dark:bg-white/10 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/60 dark:border-white/[0.06] rounded-xl px-2.5 py-1.5">
            <select
              id="role-selector"
              value={state.role}
              onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value as 'admin' | 'viewer' })}
              className="bg-transparent text-xs font-bold text-neutral-900 dark:text-white outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-neutral-900"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
            <span className={cn(
              'w-2 h-2 rounded-full',
              state.role === 'admin' ? 'bg-emerald-500' : 'bg-amber-500'
            )} />
          </div>

          <button
            id="dark-mode-toggle"
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/60 dark:border-white/[0.06] flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            {state.darkMode ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav — full-width row below header */}
      <nav className="flex sm:hidden items-center gap-1 px-4 pb-2.5 pt-0.5">
        {(['dashboard', 'transactions', 'insights'] as const).map(tab => (
          <button
            key={tab}
            id={`nav-mobile-${tab}`}
            onClick={() => dispatch({ type: 'SET_TAB', payload: tab })}
            className={cn(
              'flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 capitalize text-center',
              state.activeTab === tab
                ? 'bg-neutral-800 dark:bg-white/10 text-white dark:text-white'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}
