import { parseDate } from "./dateOps";

export const sortLineListByAppointmentDate = (lineList: Array<any> = []) => {
  return lineList.sort((a, b) => {
    const dateA: any = parseDate(a?.appointmentDate);
    const dateB: any = parseDate(b?.appointmentDate);

    if (!dateA && !dateB) return -1;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA - dateB;
  });
};
