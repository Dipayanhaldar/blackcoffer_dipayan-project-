import { FilterProvider, useFilters } from "./context/FilterContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import StatsRow from "./components/stats/StatsRow";

import LikelihoodByYearChart from "./charts/LikelihoodByYearChart";
import TopicDistributionChart from "./charts/TopicDistributionChart";
import RelevanceByRegionChart from "./charts/RelevanceByRegionChart";
import RecordsByCountryChart from "./charts/RecordsByCountryChart";
import IntensityLikelihoodScatter from "./charts/IntensityLikelihoodScatter";
import IntensityBySectorChart from "./charts/IntensityBySectorChart";

import { useChartData } from "./hooks/useChartData";
import DataTable from "./table/DataTable";

function Dashboard() {
  const { filters } = useFilters();
  const { data, loading, error } = useChartData(filters);

  return (
    <DashboardLayout>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Business Intelligence
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                InsightBoard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Explore business trends, compare insights, and discover patterns
                across your data.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              Analytics Dashboard
            </span>
          </div>
        </section>

        <section aria-label="Dashboard statistics">
          <StatsRow />
        </section>

        <section aria-label="Data visualizations">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Data visualizations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Use the filters to explore different perspectives on your data.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <IntensityBySectorChart
              data={data}
              loading={loading}
              error={error}
            />

            <LikelihoodByYearChart
              data={data}
              loading={loading}
              error={error}
            />

            <TopicDistributionChart
              data={data}
              loading={loading}
              error={error}
            />

            <RelevanceByRegionChart
              data={data}
              loading={loading}
              error={error}
            />

            <RecordsByCountryChart
              data={data}
              loading={loading}
              error={error}
            />

            <IntensityLikelihoodScatter
              data={data}
              loading={loading}
              error={error}
            />
          </div>
        </section>

        <section aria-label="Detailed records">
          <DataTable />
        </section>

        <footer className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          InsightBoard · Business intelligence and data exploration
        </footer>
      </main>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
}
