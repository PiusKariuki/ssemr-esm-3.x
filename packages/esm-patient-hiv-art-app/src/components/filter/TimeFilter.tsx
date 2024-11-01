import React, { useState } from "react";
import { DatePicker, DatePickerInput, Button } from "@carbon/react";
import styles from "./index.scss";

interface Props {
  submitHandler(startDate: string, endDate: string): void;
}

export const TimeFilter: React.FC<Props> = ({ submitHandler }) => {

  const [dateRangeValue, setDateRangeValue] = useState([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 11, 31),
  ]);

  const changeHandler = (range: Date[]) => {
    setDateRangeValue(range);
  };

  const adjustToOffset = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset);
  };

  const handleSubmit = () => {
    if (dateRangeValue[0] && dateRangeValue[1])
      submitHandler(
        adjustToOffset(dateRangeValue[0]).toISOString().split("T")[0],
        adjustToOffset(dateRangeValue[1]).toISOString().split("T")[0]
      );
  };

  return (
    <div className={styles.parent}>
      <DatePicker
        value={dateRangeValue}
        onChange={changeHandler}
        datePickerType="range"
      >
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
