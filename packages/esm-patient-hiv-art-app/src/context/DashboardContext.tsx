import React, { createContext, useCallback, useEffect } from "react";
import { useART } from "../hooks/useART";
import { chartRequestConfig } from "../helpers/chartRequestConfig";

export const DashboardContext = createContext(null);

const DashboardProvider = ({ children }) => {
  const {
    chartData,
    time,
    setTime,
    categoryFilter,
    getDashboardData,
    setCategoryFilter,
    stats,
    waterFallDateRange,
    setWaterFallDateRange,
    viralLoadRange,
    setViralLoadRange,
    defaultStatHeaders,
    txCURRHeaders,
  } = useART();

  const memoizedGenericChartRequests = useCallback(async () => {
    try {
      getDashboardData({
        ...chartRequestConfig.adultART,
        url: chartRequestConfig.adultART.url({
          time,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.childART,
        url: chartRequestConfig.childART.url({
          time,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.underCareOfCommunityProgram,
        url: chartRequestConfig.underCareOfCommunityProgram.url({
          time,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedVLChartRequests = useCallback(async () => {
    try {
      getDashboardData({
        ...chartRequestConfig.viralLoadSamples,
        url: chartRequestConfig.viralLoadSamples.url({
          time,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.viralLoadResults,
        url: chartRequestConfig.viralLoadResults.url({
          time,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.viralLoadCoverage,
        url: chartRequestConfig.viralLoadCoverage.url({
          time,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.viralLoadSuppression,
        url: chartRequestConfig.viralLoadSuppression.url({
          time,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  const memoizedHVLCascade = useCallback(() => {
    try {
      getDashboardData({
        ...chartRequestConfig.highViralLoadCascade,
        url: chartRequestConfig.highViralLoadCascade.url({
          time: viralLoadRange,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [viralLoadRange]);

  const memoizedWaterFallData = useCallback(() => {
    try {
      getDashboardData({
        ...chartRequestConfig.waterfall,
        url: chartRequestConfig.waterfall.url({
          time: waterFallDateRange,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [waterFallDateRange]);

  const memoizedInitialBatchOfData = useCallback(async () => {
    try {
      getDashboardData({
        ...chartRequestConfig.newlyEnrolledClients,
        url: chartRequestConfig.newlyEnrolledClients.url({
          time,
          categoryFilter,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.activeClients,
        url: chartRequestConfig.activeClients.url({
          time,
          categoryFilter,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.allClients,
        url: chartRequestConfig.allClients.url({
          time,
        }),
      });
      getDashboardData({
        ...chartRequestConfig.onAppointment,
        url: chartRequestConfig.onAppointment.url({
          time,
          categoryFilter,
        }),
      });

      getDashboardData({
        ...chartRequestConfig.missedAppointment,
        url: chartRequestConfig.missedAppointment.url({
          time,
          categoryFilter,
        }),
      });
      getDashboardData({
        ...chartRequestConfig.interrupted,
        url: chartRequestConfig.interrupted.url({
          time,
          categoryFilter,
        }),
      });
      getDashboardData({
        ...chartRequestConfig.returned,
        url: chartRequestConfig.returned.url({
          time,
          categoryFilter,
        }),
      });
      getDashboardData({
        ...chartRequestConfig.dueForViralLoad,
        url: chartRequestConfig.dueForViralLoad.url({
          time,
          categoryFilter,
        }),
      });
      getDashboardData({
        ...chartRequestConfig.highViralLoad,
        url: chartRequestConfig.highViralLoad.url({
          time,
          categoryFilter,
        }),
      });
    } catch (e) {
      return e;
    }
  }, [time, categoryFilter]);

  useEffect(() => {
    memoizedInitialBatchOfData();
  }, [time, categoryFilter]);

  return (
    <DashboardContext.Provider
      value={{
        chartData,
        setCategoryFilter,
        categoryFilter,
        stats,
        time,
        setTime,
        setWaterFallDateRange,
        setViralLoadRange,
        defaultStatHeaders,
        txCURRHeaders,
        memoizedGenericChartRequests,
        memoizedVLChartRequests,
        viralLoadRange,
        memoizedHVLCascade,
        memoizedWaterFallData,
        waterFallDateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardProvider;
