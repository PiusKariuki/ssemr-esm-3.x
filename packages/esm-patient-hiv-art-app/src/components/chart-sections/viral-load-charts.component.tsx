import React, { useContext, useEffect } from "react";
import { useCharts } from "../../hooks/useCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";

const ViralLoadChartsComponent = () => {
  const { viralLoadChartsConfig } = useCharts();

  const {
    time,
    memoizedVLChartRequests,
    viralLoadRange,
    memoizedHVLCascade,
    categoryFilter,
  } = useContext(DashboardContext);

  useEffect(() => {
    memoizedVLChartRequests();
  }, [categoryFilter, time]);

  useEffect(() => {
    memoizedHVLCascade();
  }, [viralLoadRange]);

  return (
    <HivArtChartsLayoutComponent
      config={viralLoadChartsConfig}
      styleKey="viral-load"
    />
  );
};

export default ViralLoadChartsComponent;
