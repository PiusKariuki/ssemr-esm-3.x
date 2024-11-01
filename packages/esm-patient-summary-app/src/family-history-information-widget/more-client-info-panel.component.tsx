import React from "react";
import styles from "./more-info-panel.scss";
import ClientInfo from "../family-history-information/more-client-info.component";

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
        <div
          style={{ width: "100%", minHeight: "10rem" }}
          data-test-id="client-info"
        >
          <ClientInfo patientUuid={patientUuid} code={""} />
        </div>
      </div>
    </>
  );
};

export default ClientFamilyInfoPanel;
