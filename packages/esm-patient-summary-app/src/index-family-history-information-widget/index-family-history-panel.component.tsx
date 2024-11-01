import React from "react";
import styles from "./more-info-panel.scss";
import IndexFamilyInfo from "../index-family-history-information/index-family-info.component";

interface MoreClientInfoPanelProps {
  patientUuid: string;
  formEntrySub: any;
}

const ClientFamilyInfoPanel: React.FC<MoreClientInfoPanelProps> = ({
  patientUuid,
}) => {
  return (
    <>
      <div className={styles.widgetCard}>
        <div style={{ width: "100%", minHeight: "10rem" }}>
          <IndexFamilyInfo patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default ClientFamilyInfoPanel;
