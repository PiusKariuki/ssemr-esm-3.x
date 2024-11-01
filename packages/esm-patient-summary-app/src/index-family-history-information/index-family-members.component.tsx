import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import styles from "./more-info.scss";
import useObservationData from "../hooks/useObservationData";

export interface IndexFamilyHistoryProps {
  patientUuid: string;
  code: string;
}

const IndexFamilyHistory: React.FC<IndexFamilyHistoryProps> = ({ code }) => {
  const [patientUuid, setPatientUuid] = useState("");

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const { data, defaultIndexTableHeaders } = useObservationData(patientUuid);

  const getPatientUuid = () => {
    const currentUrl = window.location.href;

    // Regular expression to match UUID pattern
    const uuidRegex = /\/patient\/([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})\//;
    const match = uuidRegex.exec(currentUrl);

    const uuid = match ? match[1] : null;

    setPatientUuid(uuid);
  };

  useEffect(() => {
    getPatientUuid();
  }, []);

  const getObservationData = () => {
    if (data && data.results && data.results.length > 0) {
      const allFamilyMembers = data.results.flatMap(
        (result) => result.indexFamilyMembers || []
      );

      if (allFamilyMembers.length > 0) {
        setColumns(defaultIndexTableHeaders);

        setRows(allFamilyMembers);
      }
    }
  };

  useEffect(() => {
    if (data) getObservationData();
  }, [data]);

  const customStyles = {
    cells: {
      style: {
        minHeight: "72px",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    headCells: {
      style: {
        fontSize: ".9rem",
        fontWeight: "600",
      },
    },
  };

  return (
    <div className={styles.datatable}>
      <DataTable
        columns={columns}
        data={rows}
        responsive
        pagination
        customStyles={customStyles}
        striped
        fixedHeader
        pointerOnHover
        noDataComponent={
          <div className={styles.emptyText}>No Index Family Members Found</div>
        }
      />
    </div>
  );
};
export default IndexFamilyHistory;
