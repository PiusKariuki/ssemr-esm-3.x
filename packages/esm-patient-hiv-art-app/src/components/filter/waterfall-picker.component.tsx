import React, { useCallback, useContext } from "react";
import styles from "./index.scss";
import { RadioButton, RadioButtonGroup } from "@carbon/react";
import QuarterPickerComponent from "./quarter-picker.component";
import { DashboardContext } from "../../context/DashboardContext";
import MonthlyPickerComponent from "./monthly-picker.component";

const groupingOptions = ["quarterly", "monthly"];

const WaterfallPicker = () => {
  const { setWaterFallDateRange, waterfallDateRange } =
    useContext(DashboardContext);

  const [grouping, setGrouping] = React.useState("quarterly");

  const changeCallback = useCallback(
    (range) => {
      setWaterFallDateRange({
        startDate: range.start,
        endDate: range.end,
      });
    },
    [waterfallDateRange]
  );

  return (
    <div className={styles.cascadePicker}>
      <div className={styles.cascadeRadios}>
        <RadioButtonGroup
          className={styles.cacadeRadios}
          size="sm"
          name="waterfall grouping"
          defaultSelected={grouping}
          selected={grouping}
          orientation="horizontal"
          value={grouping}
          onChange={(value: React.SetStateAction<string>) => setGrouping(value)}
        >
          {groupingOptions.map((option, index) => (
            <RadioButton
              checked={option == grouping}
              labelText={option}
              value={option}
              id={index}
              key={index}
            />
          ))}
        </RadioButtonGroup>
      </div>

      {grouping === "quarterly" ? (
        <QuarterPickerComponent changeCallback={changeCallback} />
      ) : (
        <MonthlyPickerComponent changeCallback={changeCallback} />
      )}
    </div>
  );
};

export default WaterfallPicker;
