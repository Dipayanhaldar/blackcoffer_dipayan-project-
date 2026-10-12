import { useState, useEffect } from "react";
import { useFilters } from "../../context/FilterContext";
import { useDebounce } from "../../hooks/useDebounce";
import { Search, Menu, BarChart3 } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  const { setSearch } = useFilters();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 400);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">
              InsightBoard
            </p>
            <p className="text-xs text-slate-500">
              Business intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="Search dashboard data"
          placeholder="Search title, topic, insight..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />
      </div>
    </header>
  );
}
