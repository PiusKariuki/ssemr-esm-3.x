import React from "react";
import styles from "./program-summary.scss";
import { useTranslation } from "react-i18next";
import { StructuredListSkeleton, Tile } from "@carbon/react";
import useObservationData from "../hooks/useObservationData";
export interface ProgramSummaryProps {
  patientUuid: string;
  code: string;
}
const ProgramSummary: React.FC<ProgramSummaryProps> = ({ patientUuid }) => {
  const { data, isLoading, error } = useObservationData(patientUuid);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Tile>
        <StructuredListSkeleton role="progressbar" />
      </Tile>
    );
  }

  if (error) {
    return (
      <span>{t("errorPatientSummary", "Error loading Patient summary")}</span>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const bmiMuac = () => {
    if (data.results[0]?.bmi) {
      return data.results[0]?.bmi;
    } else if (data.results[0]?.muac) {
      return data.results[0]?.muac;
    } else {
      return "---";
    }
  };

  return (
    <>
      <div className={styles.card}>
        {data?.results && (
          <div className={styles.container}>
            <div className={styles.content}>
              <p>{t("dateOfEnrollment", "Date of Enrollment")}</p>
              <p>{data?.results[0]?.enrollmentDate}</p>
            </div>
            <div className={styles.content}>
              <p>{t("lastVisitDate", "Last Visit Date")}</p>
              <p className={styles.value}>
                {data?.results[0]?.lastVisitDate
                  ? data?.results[0]?.lastVisitDate
                  : "---"}
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("nextVisitDate", "Next Visit Date")}</p>
              <p>
                <span className={styles.value}>
                  {data?.results[0]?.appointmentDate}
                </span>
              </p>
            </div>
            <div className={styles.content}>
              <p>{t("bmiMuac", "BMI/MUAC")}</p>
              <p>
                <span className={styles.value}>{bmiMuac()}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProgramSummary;
