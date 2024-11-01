import { TableCell, Tag } from "@carbon/react";
import Link from "@carbon/react/lib/components/UIShell/Link";
import React from "react";

export const defaultStatHeaders = [
  {
    name: "Name",
    selector: "name",
    cell: (row) => (
      <TableCell>
        <Link
          href={`${window.getOpenmrsSpaBase()}patient/${
            row?.uuid
          }/chart/Patient%20Summary`}
        >
          {row.name}
        </Link>
      </TableCell>
    ),
  },
  {
    name: "Sex",
    selector: "sex",
  },
  {
    name: "Date enrolled",
    selector: "dateEnrolled",
  },
  {
    name: "Last refill date",
    selector: "lastRefillDate",
  },
  {
    name: "Contact",
    selector: "contact",
  },
  {
    name: "Village",
    selector: "village",
    cell: (row) => (
      <TableCell>
        <p className="">{row.address.split(",")[0].split(":")[1]}</p>
      </TableCell>
    ),
  },
  {
    name: "Landmark",
    selector: "landMark",
    cell: (row) => (
      <TableCell>
        <p className="">{row.address.split(",")[1].split(":")[1]}</p>
      </TableCell>
    ),
  },
];

export const iitAndMissedHeaders = defaultStatHeaders;
iitAndMissedHeaders.splice(4, 0, {
  name: "Next appointment date",
  selector: "appointmentDate",
});

export const txCURRHeaders = [
  ...iitAndMissedHeaders,
  {
    name: "Eligible for VL",
    selector: "dueForVl",
    cell: (row) => (
      <TableCell size="sm">
        <Tag size="md" type={`${row.dueForVl ? "green" : "red"}`}>
          {row?.dueForVl ? "Eligible" : "Not eligible"}
        </Tag>
      </TableCell>
    ),
  },
];
