import React from "react";
import styles from "./community-linkage.scss";
import { useTranslation } from "react-i18next";
import useObservationData from "../hooks/useObservationData";
import { StructuredListSkeleton, Tile } from "@carbon/react";

export interface CommunityLinkageProps {
  patientUuid: string;
  code: string;
}
const CommunityLinkage: React.FC<CommunityLinkageProps> = ({ patientUuid }) => {
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

  return (
    <>
      <div className={styles.card}>
        {data.results && (
          <div className={styles.container}>
            <div className={styles.content}>
              <p style={{ marginRight: "15px" }}>
                {t("nameOfCHW", "Name of the Community Health Worker (CHW)")}
              </p>
              <p>{data?.results[0]?.chwName}</p>
            </div>
            <div className={styles.content}>
              <p>{t("telephoneNumber", "Telephone Number")}</p>
              <p className={styles.value}>{data?.results[0]?.chwPhone}</p>
            </div>
            <div className={styles.content}>
              <p>
                {t(
                  "chwAddress",
                  "LandMark/Address Of Community Health Worker (CHW)"
                )}
              </p>
              <p>
                <span className={styles.value}>
                  {data?.results[0].chwAddress}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CommunityLinkage;
