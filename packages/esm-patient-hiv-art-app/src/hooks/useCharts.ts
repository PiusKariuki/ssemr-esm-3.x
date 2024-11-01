import {useContext} from "react";
import {DashboardContext} from "../context/DashboardContext";
import {processWaterfallData} from "../helpers/dataManipulation";
import {renderWaterfallTooltip} from "../helpers/tooltips";

export interface ChartConfigItem {
  chartData?: Array<any>;
  listData?: Array<any>;
  title?: string;
  tooltipRenderFunction?: (item: any) => string;
  headerTableColumns?: Array<any>;
  xKey?: string;
  yKey?: string;
  loading?: boolean;
  chartType: string;
  total?: number;
}

export const useCharts = () => {
  const {
    chartData: {
      newlyEnrolledClients,
      activeClients,
      adultART,
      childART,
      underCareOfCommunityProgram,
      allClients,
      dueForViralLoad,
      viralLoadSamples,
      viralLoadResults,
      viralLoadCoverage,
      viralLoadSuppression,
      waterfall,
    },
    defaultStatHeaders,
    txCURRHeaders,
  } = useContext(DashboardContext);

  const currentTimeFilter = "groupYear";

  const waterfallConfig: Array<ChartConfigItem> = [
    {
      loading: waterfall?.loading,
      tooltipRenderFunction: ({currentItem, previousItem}) =>
        renderWaterfallTooltip({
          currentValue: currentItem,
          previousValue: previousItem,
        }),
      chartData: processWaterfallData(waterfall?.processedChartData),
      listData: [],
      title: "Waterfall Chart",
      headerTableColumns: [],
      xKey: "group",
      chartType: "waterfall",
    },
  ];

  const genericChartsConfig = [
    {
      loading: newlyEnrolledClients?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: newlyEnrolledClients?.processedChartData,
      listData: newlyEnrolledClients?.raw?.results,
      title: "Newly Enrolled Clients (TX_NEW)",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: activeClients?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: activeClients?.processedChartData,
      listData: activeClients?.raw?.results,
      title: "Clients currently receiving ART (TX_CURR)",
      headerTableColumns: txCURRHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: adultART?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.total}`,
      chartData: adultART?.processedChartData,
      listData: [],
      title: "Adult ART Regimen",
      headerTableColumns: [],
      xKey: "text",
      yKey: "total",
      chartType: "bar",
    },
    {
      loading: childART?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.total}`,
      chartData: childART?.processedChartData,
      listData: [],
      title: "Child ART Regimen",
      headerTableColumns: [],
      xKey: "text",
      yKey: "total",
      chartType: "bar",
    },
    {
      loading: underCareOfCommunityProgram.loading,
      tooltipRenderFunction: (item) =>
        `${item.data.name}: ${Math.round(
          (item.data.value / allClients?.raw?.results?.length) * 100
        )}%`,
      chartData: [
        {
          name: "Other clients",
          value:
            allClients?.raw?.results?.length -
            underCareOfCommunityProgram?.raw?.results?.length,
        },
        {
          name: "Under Care",
          value: underCareOfCommunityProgram?.raw?.results?.length,
        },
      ],
      listData: underCareOfCommunityProgram?.raw?.results,
      title: "Under Care Of Community Programmes",
      total: allClients?.raw?.results?.length,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
  ];

  const viralLoadChartsConfig = [
    {
      loading: dueForViralLoad?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: dueForViralLoad?.processedChartData,
      listData: dueForViralLoad?.raw?.results,
      title: "Due for viral load",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: viralLoadSamples?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: viralLoadSamples?.processedChartData,
      listData: viralLoadSamples?.raw?.results,
      title: "Viral load samples collected",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: viralLoadResults?.loading,
      tooltipRenderFunction: (row) => `Clients: ${row.clients}`,
      chartData: viralLoadResults?.processedChartData,
      listData: viralLoadResults?.raw?.results,
      title: "Viral Load Results",
      headerTableColumns: defaultStatHeaders,
      xKey: currentTimeFilter,
      yKey: "clients",
      chartType: "bar",
    },
    {
      loading: viralLoadCoverage.loading,
      tooltipRenderFunction: (item) =>
        `${item.data.name}: ${Math.round(
          (item.data.value / allClients?.raw?.results?.length) * 100
        )}%`,
      chartData: [
        {
          name: "Not covered",
          value:
            allClients?.raw?.results?.length -
            viralLoadCoverage?.raw?.results?.length,
        },
        {
          name: "Covered",
          value: viralLoadCoverage?.raw?.results?.length,
        },
      ],
      listData: viralLoadCoverage?.raw?.results,
      title: "Viral Load Coverage",
      total: allClients?.raw?.results?.length,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
    {
      loading: viralLoadSuppression.loading,
      tooltipRenderFunction: (item) =>
        `${item.data.name}: ${Math.round(
          (item.data.value / viralLoadCoverage?.raw?.results?.length) * 100
        )}%`,
      chartData: [
        {
          name: "Unsuppressed",
          value:
            viralLoadCoverage?.raw?.results?.length -
            viralLoadSuppression?.raw?.results?.length,
        },
        {
          name: "Suppressed",
          value: viralLoadSuppression?.raw?.results?.length,
        },
      ],
      listData: viralLoadSuppression?.raw?.results,
      title: "Viral Load Suppression",
      total: viralLoadCoverage?.raw?.results?.length,
      headerTableColumns: defaultStatHeaders,
      chartType: "pie",
    },
    {
      chartType: "HVL",
    },
  ];

  return {waterfallConfig, genericChartsConfig, viralLoadChartsConfig};
};
