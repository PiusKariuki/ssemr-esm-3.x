import { openmrsFetch } from "@openmrs/esm-framework";
import { useState } from "react";
import {
  getThisQuartersRange,
  getThisYearsFirstAndLastDate,
} from "../helpers/dateOps";
import { initialChartDataState } from "../assets/initialChartDataState";
import { sortLineListByAppointmentDate } from "../helpers/sortLineListByAppointmentDate";
import {
  defaultStatHeaders,
  iitAndMissedHeaders,
  txCURRHeaders,
} from "../helpers/statCardHeaders";

export const useART = () => {
  const [categoryFilter, setCategoryFilter] = useState("");

  const [time, setTime] = useState({
    startDate: getThisYearsFirstAndLastDate().startDate,
    endDate: getThisYearsFirstAndLastDate().endDate,
  });

  const [waterFallDateRange, setWaterFallDateRange] = useState({
    startDate: getThisQuartersRange().start,
    endDate: getThisQuartersRange().end,
  });

  const [viralLoadRange, setViralLoadRange] = useState({
    startDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).startDate,
    endDate: getThisYearsFirstAndLastDate(new Date().getFullYear()).endDate,
  });

  const [chartData, setChartData] = useState(initialChartDataState);

  const getDashboardData = async ({
    url,
    processor,
    chartKey,
    noPagination = false,
  }) => {
    try {
      /**
       * Init loading state for  the specific chart
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          ...prev[chartKey],
          loading: true,
        },
      }));

      /**
       * send API call and hit the callback
       */
      const response = await openmrsFetch(url);

      /**
       * Turn off the loading state after first page
       */
      setChartData((prev) => ({
        ...prev,
        [chartKey]: {
          raw: response.data,
          processedChartData: processor(response.data),
          loading: false,
        },
      }));


      /**
       * additional pages
       */
      const pageSize = 15;
      if (!noPagination && response?.data?.pageSize === pageSize) {
        let currentPage = 1;
        let currentPageSize = pageSize;

        while (currentPageSize === pageSize) {
          const { data } = await openmrsFetch(
            `${url}&page=${currentPage}&size=${pageSize}`
          );

          if (data?.results?.length > 0) {
            setChartData((prev) => ({
              ...prev,
              [chartKey]: {
                ...prev[chartKey],
                raw: {
                  ...(prev[chartKey]?.raw || []),
                  results: [
                    ...(prev[chartKey]?.raw?.results || []),
                    ...data.results,
                  ],
                },
              },
            }));

            currentPageSize = data.results.length;
            currentPage++;
          } else {
            break;
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  const stats = [
    {
      title: "Newly enrolled clients(TX_NEW)",
      color: "#3271F4",
      stat: chartData.newlyEnrolledClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.newlyEnrolledClients?.raw?.results
      ),
      loading: chartData.newlyEnrolledClients.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Active clients (TX_CURR)",
      color: "#3271F4",
      stat: chartData.activeClients?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.activeClients?.raw?.results
      ),
      loading: chartData.activeClients.loading,
      headers: txCURRHeaders,
    },
    {
      title: "On appointment",
      color: "#3271F4",
      stat: chartData.onAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.onAppointment?.raw?.results
      ),
      loading: chartData.onAppointment.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Missed appointments",
      color: "#FF0000",
      stat: chartData.missedAppointment?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.missedAppointment?.raw?.results
      ),
      loading: chartData.missedAppointment.loading,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Interruptions in Treatment(TX_IIT)",
      color: "#FF8503",
      stat: chartData.interrupted?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.interrupted?.raw?.results
      ),
      loading: chartData.interrupted.loading,
      headers: iitAndMissedHeaders,
    },
    {
      title: "Returned to Treatment(TX_RTT)",
      color: "#3271F4",
      stat: chartData.returned?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(chartData.returned?.raw?.results),
      loading: chartData.returned.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "Due for viral load",
      color: "#FF8503",
      stat: chartData.dueForViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.dueForViralLoad?.raw?.results
      ),
      loading: chartData.dueForViralLoad.loading,
      headers: defaultStatHeaders,
    },
    {
      title: "High viral load (>= 1000 copies/ml)",
      color: "#FF0000",
      stat: chartData.highViralLoad?.raw?.totalPatients,
      results: sortLineListByAppointmentDate(
        chartData.highViralLoad?.raw?.results
      ),
      loading: chartData.highViralLoad.loading,
      headers: defaultStatHeaders,
    },
  ];

  return {
    getDashboardData,
    chartData,
    time,
    setTime,
    categoryFilter,
    setCategoryFilter,
    stats,
    waterFallDateRange,
    setWaterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    defaultStatHeaders,
    txCURRHeaders,
  };
};
