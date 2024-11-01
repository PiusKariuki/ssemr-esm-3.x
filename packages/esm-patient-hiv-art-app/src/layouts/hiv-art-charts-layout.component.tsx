import styles from "./index.scss";
import { ChartConfigItem } from "../hooks/useCharts";
import D3BarChartComponent from "../components/charts/bar-graph/d3-bar-chart.component";
import React from "react";
import D3LineGraphComponent from "../components/charts/line-graph/d3-line-graph.component";
import D3PieChartComponent from "../components/charts/pie-chart/d3-pie-chart.component";
import D3WaterfallComponent from "../components/charts/waterfall/d3-waterfall.component";
import HighViralLoadCascade from "../components/charts/cascade/HighViralLoadCascade";

const HivArtChartsLayoutComponent: React.FC<{
  config: Array<ChartConfigItem>;
  styleKey: string;
}> = ({ config, styleKey }) => {
  return (
    <div className={styles[styleKey]}>
      {config.map((config) => (
        <div className={styles[`${styleKey}-chart`]}>
          {config.chartType === "bar" ? (
            <D3BarChartComponent {...config} />
          ) : config.chartType === "line" ? (
            <D3LineGraphComponent {...config} />
          ) : config.chartType === "pie" ? (
            <D3PieChartComponent {...config} />
          ) : config.chartType === "waterfall" ? (
            <D3WaterfallComponent {...config} />
          ) : (
            <HighViralLoadCascade />
          )}
        </div>
      ))}
    </div>
  );
};

export default HivArtChartsLayoutComponent;
