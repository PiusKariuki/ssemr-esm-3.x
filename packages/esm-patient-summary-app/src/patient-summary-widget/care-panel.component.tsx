import React  from "react";
import { useTranslation } from "react-i18next";
import styles from "./care-panel.scss";
import ProgramSummary from "../program-summary/program-summary.component";
import { CardHeader } from "@openmrs/esm-patient-common-lib";
import LastArtVisitSummary from "../last-arv-visit-summary/last-arv-visit-summary.component";

interface CarePanelProps {
  patientUuid: string;
  formEntrySub: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  launchPatientWorkspace: Function;
}

const CarePanel: React.FC<CarePanelProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.widgetCard}>
        <CardHeader
          title={t("lastArtVisitSummary", "Last ART Visit Summary")}
          children={""}
        ></CardHeader>
        <div style={{ width: "100%", minHeight: "10rem" }}>
          <ProgramSummary patientUuid={patientUuid} code={""} />
          <LastArtVisitSummary patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default CarePanel;
