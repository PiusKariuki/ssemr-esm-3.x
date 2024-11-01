import React, { useContext, useEffect } from "react";
import { useCharts } from "../../hooks/useCharts";
import HivArtChartsLayoutComponent from "../../layouts/hiv-art-charts-layout.component";
import { DashboardContext } from "../../context/DashboardContext";

const ComplexCharts = () => {
  const { waterfallConfig } = useCharts();
  const { memoizedWaterFallData, waterFallDateRange } =
    useContext(DashboardContext);

  useEffect(() => {
    memoizedWaterFallData();
  }, [waterFallDateRange]);

  return (
    <HivArtChartsLayoutComponent
      config={waterfallConfig}
      styleKey="waterfall"
    />
  );
};

export default ComplexCharts;
