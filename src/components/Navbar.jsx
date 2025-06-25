import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-neutral-900/90 backdrop-blur px-0 py-3 flex items-center justify-between border-b border-slate-100 dark:border-neutral-800">
      <div className="flex items-center gap-2 pl-2">
        <img src="/firebase.svg" className="w-7 h-7" alt="Logo" />
        <span className="font-semibold text-lg text-slate-900 dark:text-white tracking-tight">Firebase Call App</span>
      </div>
      <button
        aria-label="Toggle dark mode"
        onClick={() => setDarkMode((d) => !d)}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
      >
        {darkMode ? <BsSun className="text-yellow-400 text-xl" /> : <BsMoon className="text-slate-700 dark:text-white text-xl" />}
      </button>
    </header>
  );
};

export default Navbar;
