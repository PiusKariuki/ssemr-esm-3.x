import React, { useContext, useEffect } from "react";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { useCharts } from "../../hooks/useCharts";
import { DashboardContext } from "../../context/DashboardContext";

const GenericCharts = () => {
  const { genericChartsConfig } = useCharts();

  const { time, categoryFilter, memoizedGenericChartRequests } =
    useContext(DashboardContext);

  useEffect(() => {
    memoizedGenericChartRequests();
  }, [categoryFilter, time]);

  return (
    <HivArtChartsLayoutComponent
      config={genericChartsConfig}
      styleKey="generic"
    />
  );
};

export default GenericCharts;
