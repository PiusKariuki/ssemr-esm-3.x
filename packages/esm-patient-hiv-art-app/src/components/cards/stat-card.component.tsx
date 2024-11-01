import React, { useEffect, useState } from "react";
import styles from "./stat-card.scss";
import {
  Loading,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";

interface Client {
  name: string;
  uuid: string;
  sex: string;
  dateEnrolled: string;
  lastRefillDate: string;
  contact: string;
  address: string;
}
interface header {
  name: string;
  selector: string;
  cell: any;
}
interface Item {
  loading: boolean;
  title: string;
  color: string;
  stat: string;
  results?: Client[];
  headers: header[];
}

interface Address {
  name: string;
  uuid: string;
  sex: string;
  dateEnrolled: string;
  lastRefillDate: string;
  contact: string;
  landMark: string;
  village: string;
}

interface StatCardProps {
  item: Item;
}

const StatCardComponent: React.FC<StatCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState<Address[]>([]);
  const [csvData, setCsvData] = useState<string | null>(null);

  const generateCSV = () => {
    const data = [
      [
        "Name",
        "Sex",
        "Date enrolled",
        "Last Refill Date",
        "Contact",
        "Village",
        "Land Mark",
      ],
    ];
    rows.forEach((row) => {
      const values = [
        row.name,
        row.sex,
        row.dateEnrolled,
        row.lastRefillDate,
        row.contact,
        row.landMark,
        row.village,
      ];
      data.push(values);
    });

    let csv = "";
    data.forEach((row) => {
      csv += row.join(",") + "\n";
    });

    setCsvData(csv);
  };

  const handleDownload = () => {
    if (csvData) {
      const blob = new Blob([csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${item.title}.csv`;
      link.click();
    }
  };

  useEffect(() => {
    if (item?.results) {
      const formattedResults = item.results?.map((client) => {
        const addressParts = client?.address?.split(",") || [];

        // Safely extract landMark and village, ensuring they exist before trimming
        const landMark = addressParts[0]?.split(":")[1]?.trim() || 'Unknown';
        const village = addressParts[1]?.split(":")[1]?.trim() || 'Unknown';

        return {
          ...client,
          landMark,
          village,
        };
      });

      setRows(formattedResults);
    }
  }, [item]);

  useEffect(() => {
    generateCSV();
  }, [rows]);

  return (
    <div
      style={{ color: item.color, borderColor: item.color }}
      className={styles.card}
    >
      {item?.results?.length > 0 && (
        <svg
          className={styles.download}
          onClick={() => setIsModalOpen((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill={item.color}
            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
        </svg>
      )}

      <Modal
        size="lg"
        onRequestSubmit={handleDownload}
        modalHeading={item.title}
        modalLabel="Do you want to download this as CSV?"
        primaryButtonText="Download CSV"
        secondaryButtonText="Decline"
        open={isModalOpen}
        onSecondarySubmit={() => setIsModalOpen(false)}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <Table size="lg" useZebraStyles={false}>
          <TableHead>
            <TableRow>
              {item.headers.map((header) => (
                <TableHeader id={header} key={header}>
                  {header.name}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {item.headers.map((header) => (
                  <>
                    {header.cell ? (
                      header.cell(row)
                    ) : (
                      <TableCell>{row[header.selector]}</TableCell>
                    )}
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Modal>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.stat}>
        {item.loading ? (
          <Loading small className={styles.spinner} withOverlay={false} />
        ) : (
          <p className="">{item.stat || 0}</p>
        )}
      </div>
    </div>
  );
};

export default StatCardComponent;
