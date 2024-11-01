import React from "react";
import styles from "./more-info.scss";
import { useTranslation } from "react-i18next";
import useObservationData from "../hooks/useObservationData";
import IndexFamilyHistory from "./index-family-members.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";

export interface IndexFamilyInfoProps {
  patientUuid: string;
  code: string;
}
const IndexFamilyInfo: React.FC<IndexFamilyInfoProps> = ({
  patientUuid,
}) => {
  const { data, error } = useObservationData(patientUuid);
  const { t } = useTranslation();

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
        <CardHeader
          title={t("indexFamilyMembers", "Index-Family Members")}
          children={""}
        ></CardHeader>
        <div className={styles.container}>
          <IndexFamilyHistory patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};
export default IndexFamilyInfo;
