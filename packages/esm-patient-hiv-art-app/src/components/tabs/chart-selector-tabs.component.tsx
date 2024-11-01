import { Tab, TabList, Tabs } from "@carbon/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChartSelectorTabsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      name: "Treatment Charts",
      path: "/",
    },
    {
      name: "Viral Load Charts",
      path: "/viral-load-charts",
    },
    {
      name: "Waterfall chart",
      path: "/waterfall-chart",
    },
  ];

  return (
    <Tabs
      selectedIndex={tabs.findIndex((tab) => location.pathname === tab.path)}
    >
      <TabList aria-label="List of tabs">
        {tabs.map((tab, index) => (
          <Tab
            selectedIndex={location.pathname === tab.path}
            onClick={() => navigate(tab.path)}
            key={tab.path}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default ChartSelectorTabsComponent;
