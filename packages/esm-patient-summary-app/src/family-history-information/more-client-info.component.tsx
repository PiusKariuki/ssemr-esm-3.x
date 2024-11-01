import React from "react";
import styles from "./more-info.scss";
import { useTranslation } from "react-i18next";
import useObservationData from "../hooks/useObservationData";
import FamilyHistory from "./family-members.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";

export interface ClientInfoProps {
  patientUuid: string;
  code: string;
}
const ClientInfo: React.FC<ClientInfoProps> = ({ patientUuid, code }) => {
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
          title={t("familyMembers", "Family Members")}
          children={""}
        ></CardHeader>
        <div className={styles.container}>
          <FamilyHistory patientUuid={""} code={""} />
        </div>
      </div>
    </>
  );
};
export default ClientInfo;
