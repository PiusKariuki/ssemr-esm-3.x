import styles from "../charts/index.scss";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import React from "react";

const Header = ({ data, isModalOpen, setIsModalOpen, headers, rows }) => {
  //
  const handleDownload = () => {
    const data = [[headers]];
    rows.forEach((row) => {
      const values = [
        row.text,
        row.total,
        Math.round(row.percentage * 100) / 100,
        row.averageTurnaroundTimeMonths,
      ];
      data.push(values);
    });

    let csvData = "";
    data.forEach((row) => {
      csvData += row.join(",") + "\n";
    });

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "High-Viral-Load-Cascade.csv";
    link.click();
  };

  return (
    <div className={styles.cascadeHeader}>
      <svg
        onClick={() => setIsModalOpen((prev) => !prev)}
        style={{ width: 16, height: 16, fill: "#161616" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
      </svg>

      <Modal
        onRequestSubmit={handleDownload}
        modalHeading=""
        modalLabel="Do you want to download this as CSV?"
        primaryButtonText="Download CSV"
        secondaryButtonText="Decline"
        open={isModalOpen}
        onSecondarySubmit={() => setIsModalOpen(false)}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Table size="md" useZebraStyles={false}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader id={header} key={header}>
                  {header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.text}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{Math.round(row.percentage * 100) / 100}</TableCell>
                <TableCell>{row.averageTurnaroundTimeMonths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>
    </div>
  );
};

export default Header;
