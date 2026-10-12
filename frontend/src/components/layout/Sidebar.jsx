import { useFilters } from "../../context/FilterContext";
import { useFilterOptions } from "../../hooks/useFilterOptions";
import Spinner from "../common/Spinner";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import dashboardLogo from "../../assets/dashboard-logo.png";

const FIELD_LABELS = {
  end_year: "End Year",
  start_year: "Start Year",
  topic: "Topic",
  sector: "Sector",
  region: "Region",
  pestle: "PEST",
  source: "Source",
  country: "Country",
  city: "City",
};

const FIELD_ORDER = [
  "end_year",
  "start_year",
  "topic",
  "sector",
  "region",
  "pestle",
  "source",
  "country",
  "city",
];

export default function Sidebar({ open, onClose }) {
  const { filters, setFilter, resetFilters } = useFilters();
  const { options, loading, error } = useFilterOptions();

  const activeFilters = Object.values(filters).filter(Boolean).length;

  const handleReset = () => {
    resetFilters();

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Dashboard filters"
        className={`
          fixed inset-y-0 left-0 z-30
          flex h-dvh w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:h-screen lg:translate-x-0
        `}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <img
            src={dashboardLogo}
            alt="InsightBoard"
            className="h-10 max-w-[190px] object-contain object-left"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 pb-2 pt-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-sky-600" />

            <h2 className="text-sm font-bold text-slate-900">
              Filters
            </h2>
          </div>

          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
            {activeFilters} active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {loading && (
            <div
              className="flex justify-center py-10"
              role="status"
              aria-label="Loading filter options"
            >
              <Spinner size="sm" />
            </div>
          )}

          {error && (
            <p
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {FIELD_ORDER.map((field) => {
                const values = options[field] || [];

                return (
                  <div key={field}>
                    <label
                      htmlFor={`filter-${field}`}
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {FIELD_LABELS[field]}
                    </label>

                    <select
                      id={`filter-${field}`}
                      value={filters[field] || ""}
                      onChange={(event) =>
                        setFilter(field, event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    >
                      <option value="">All</option>

                      {values.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
}
