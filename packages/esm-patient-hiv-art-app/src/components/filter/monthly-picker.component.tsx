import React, { useState } from "react";
import styles from "./index.scss";
import { getThisMonthsFirstAndLast } from "../../helpers/dateOps";

const MonthlyPickerComponent = ({ changeCallback }) => {
  const [month, setMonth] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 9
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }`
  );

  const monthChangeHandler = (value) => {
    const range = getThisMonthsFirstAndLast(value);
    changeCallback({ start: range.startDate, end: range.endDate });
    setMonth(value);
  };

  return (
    <div className={styles.quarterPickerParent}>
      <div className={styles.formGroup}>
        <input
          id="month"
          className={styles.monthPicker}
          value={month}
          type="month"
          onChange={(evt) => monthChangeHandler(evt.target.value)}
        />
      </div>
    </div>
  );
};

export default MonthlyPickerComponent;
