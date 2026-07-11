import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">SimpleAgent</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-400">
              Plug-and-play single-task AI agents for small businesses. One job per agent, zero orchestration.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/demo" className="text-sm text-slate-400 transition hover:text-brand-400">
                  Live demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-slate-400 transition hover:text-brand-400">
                  Developer docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/research" className="text-sm text-slate-400 transition hover:text-brand-400">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SimpleAgent. Demo built by Idea Miner.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/demo" className="hover:text-slate-300">Demo</Link>
            <Link href="/developers" className="hover:text-slate-300">Developers</Link>
            <Link href="/research" className="hover:text-slate-300">Research</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
