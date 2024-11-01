import React, { useContext } from "react";
import { Home } from "@carbon/react/icons";
import styles from "./home-dashboard.scss";
import { useTranslation } from "react-i18next";
import StatCardComponent from "../components/cards/stat-card.component";
import CategoryTabs from "../components/tabs/CategoryTabs";
import { DashboardContext } from "../context/DashboardContext";
import { TimeFilter } from "../components/filter/TimeFilter";
import { Routes, Route } from "react-router-dom";
import GenericChartsComponent from "../components/chart-sections/generic-charts.component";
import ChartSelectorTabsComponent from "../components/tabs/chart-selector-tabs.component";
import ViralLoadChartsComponent from "../components/chart-sections/viral-load-charts.component";
import ComplexCharts from "../components/chart-sections/complex-charts.component";

const HomeDashboard = () => {
  const { t } = useTranslation();

  const { stats, setTime } =
    useContext(DashboardContext);

  const timeFilterSubmitHandler = (start: string, end: string) => {
    setTime({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <div className={styles.container}>
      {/* ................Title......................... */}
      <div className={styles.header}>
        <div className={styles["left-justified-items"]}>
          <Home color="green" size="34" className={styles.homeIcon} />
          <div className={styles["page-labels"]}>
            <p className={styles.title}>
              {t("hivCareAndARTDashboard", "HIV Care and ART Dashboard")}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "fit-content",
            maxWidth: "500px",
          }}
        >
          <TimeFilter submitHandler={timeFilterSubmitHandler} />
        </div>
      </div>
      <div className={styles.artBody}>
        {/* ..................Tabs................. */}
        <CategoryTabs />

        {/* ...................Stats.................... */}
        <div className={styles.stats}>
          {stats.map((stat) => (
            <StatCardComponent item={stat} key={stat.title} />
          ))}
        </div>
        <ChartSelectorTabsComponent />
        <Routes>
          <Route path="/" element={<GenericChartsComponent />} />
          <Route
            path="/viral-load-charts"
            element={<ViralLoadChartsComponent />}
          />
          <Route path="/waterfall-chart" element={<ComplexCharts />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomeDashboard;
