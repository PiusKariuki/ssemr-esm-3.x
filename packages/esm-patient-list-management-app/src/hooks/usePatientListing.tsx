import { useTranslation } from "react-i18next";
import React from "react";
import { openmrsFetch } from "@openmrs/esm-framework";
import { Tag } from "@carbon/react";
import styles from "../lists-dashboard/lists-dashboard.scss";

export const usePatientListing = () => {
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [tableHeaders, setTableHeaders] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [filteredTableData, setFilteredTableData] = React.useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const startDate = `1970-01-01`;
  const endDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const tabs = [
    {
      id: "allClients",
      text: t("allClients", "All Clients"),
      tabClass: "allTab",
      textClass: "tabText",
    },
    {
      id: "activeClients",
      text: t("activeClients", "Active Clients"),
      tabClass: "activeTab",
      textClass: "activeTabText",
    },
    {
      id: "IIT",
      text: t("iit", "IIT Clients"),
      tabClass: "iitTab",
      textClass: "iitTabText",
    },
    {
      id: "TAD",
      text: t("transferOutAndDied", "Transferred Out Clients"),
      tabClass: "tTab",
      textClass: "tTabText",
    },
    {
      id: "Deceased",
      text: t("deceased", "Deceased Clients"),
      tabClass: "deceasedTab",
      textClass: "deceasedTabText",
    },
  ];

  const defaultTableHeaders = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
    },
    {
      name: "ART",
      selector: (row) =>
        row?.identifiers?.find((item) =>
          item?.identifierType?.toLowerCase()?.includes("art")
        )?.identifier,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
    },
    {
      name: "Date enrolled",
      selector: (row) => row.dateEnrolled,
    },
    {
      name: "Date of initiation",
      selector: (row) => row.initiationDate,
    },
    {
      name: "Last refill date",
      selector: (row) => row.lastRefillDate,
    },
  ];

  const handleTabChange = (selectedIndex) => {
    setCurrentTab(selectedIndex);

    switch (selectedIndex) {
      case 0:
        getAllClients();
        break;

      case 1:
        getActiveClients();
        break;

      case 2:
        getIIT();
        break;

      case 3:
        getTransferredOut();
        break;

      case 4:
        getDeceased();
        break;

      default:
        getAllClients();
    }
  };

  const getChartData = async ({ url, responseCallback, errorCallBack }) => {
    try {
      setLoading(true);
      const response = await openmrsFetch(url);
      responseCallback(response.data);
    } catch (error) {
      errorCallBack(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/allClients?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders([
          ...defaultTableHeaders,
          {
            name: "Clinical Status",
            button: true,
            cell: (row) => (
              <Tag
                className={
                  row.clinicalStatus === "ACTIVE"
                    ? styles.greenChip
                    : row.clinicalStatus === "INACTIVE"
                    ? styles.redChip
                    : styles.amberChip
                }
                size="md"
              >
                {row.clinicalStatus.toLowerCase().includes("interrupt")
                  ? "IIT"
                  : row.clinicalStatus}
              </Tag>
            ),
          },
        ]);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getActiveClients = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/activeClients?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getIIT = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/interruptedInTreatment?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getTransferredOut = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/transferredOut?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  const getDeceased = async () =>
    getChartData({
      url: `/ws/rest/v1/ssemr/dashboard/deceased?startDate=${startDate}&endDate=${endDate}`,
      responseCallback: (data) => {
        setTableData(data.results);
        setTableHeaders(defaultTableHeaders);
      },
      errorCallBack: (error) => console.error(error),
    });

  React.useEffect(() => {
    getAllClients();
  }, []);

  React.useEffect(() => {
    const filteredItems = tableData.filter((row) =>
      row.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredTableData(filteredItems);
    setResetPaginationToggle((prev) => !prev);
  }, [filterText, tableData]);

  return {
    tabs,
    currentTab,
    setCurrentTab,
    tableHeaders,
    tableData,
    handleTabChange,
    filterText,
    setFilterText,
    resetPaginationToggle,
    setResetPaginationToggle,
    loading,
    filteredTableData,
  };
};
