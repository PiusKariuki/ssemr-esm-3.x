import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./vl-panel.scss";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import ViralLoadlHistory from "../viral-load-history/viral-load-history.component";

interface VlPanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const VlPanel: React.FC<VlPanelProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t("viralLoadHistory", "Viral Load History")}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "20rem" }}>
          <ViralLoadlHistory patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default VlPanel;
