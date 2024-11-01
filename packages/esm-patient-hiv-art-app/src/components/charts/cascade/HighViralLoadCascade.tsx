import React, { useContext, useEffect, useRef, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { useCascade } from "../../../hooks/useCascade";
import styles from "../index.scss";
import { Loading } from "@carbon/react";
import CascadeHeader from "../../headers/cascade-header.component";
import Tooltip from "../../tooltip/cascade-tooltip.component";
import { TimeFilter } from "../../filter/TimeFilter";

const SVGChart = () => {
  const {
    setViralLoadRange,
    chartData: { highViralLoadCascade },
  } = useContext(DashboardContext);

  const chartContainerRef = useRef(null);

  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(null);

  const [data, setData] = useState([]);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: {},
  });

  const [isTableOpen, setIsTableOpen] = useState(false);

  const headers = [
    "Session",
    "Total",
    "Percentage",
    "Average Turnaround Time(Months)",
  ];

  const handleMouseOver = (evt, d) => {
    const svg = evt.target.ownerSVGElement;
    const point = svg.createSVGPoint();
    point.x = evt.clientX;
    point.y = evt.clientY;
    const cursorPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    setTooltip({
      visible: true,
      x: cursorPoint.x - 10,
      y: cursorPoint.y - 40,
      data: d,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, data: {} });
  };

  const { generateScale, scale, clearScale } = useCascade();

  useEffect(() => {
    if (highViralLoadCascade?.raw?.results.length > 0) {
      generateScale({ dataset: highViralLoadCascade.raw.results });
      setData(highViralLoadCascade.raw.results);
    }
    return () => clearScale();
  }, [highViralLoadCascade]);

  const maxValue = Math.max(...data.map((d) => d.total));
  const barWidth = (chartContainerWidth * 0.1) / (data.length - 1); // 10% of div width

  const axisPadding = 40;
  const barSpacing =
    (chartContainerWidth - axisPadding * 2 - barWidth * data.length) /
    data.length;

  const updateWidth = () => {
    if (chartContainerRef.current) {
      setChartContainerWidth(chartContainerRef.current.clientWidth);

      if (window.innerWidth < 1620) {
        setChartHeight(300);
      } else {
        setChartHeight(500);
      }
    }
  };

  useEffect(() => {
    // Measure the div's width and update the state
    updateWidth();
    // Add event listener for window resize
    window.addEventListener("resize", updateWidth);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const timeFilterSubmitHandler = (start: string, end: string) => {
    setViralLoadRange({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <div className={styles.cascadeContainer}>
      <div className={styles.cascadeHeaderContainer}>
        <p className={styles.title}>High Viral Load Cascade</p>
        <div className={styles.cascadeFilterAndHeaderContainer}>
          <TimeFilter submitHandler={timeFilterSubmitHandler} />
          <CascadeHeader
            data={data}
            headers={headers}
            isModalOpen={isTableOpen}
            setIsModalOpen={setIsTableOpen}
            rows={data}
          />
        </div>
      </div>
      {highViralLoadCascade.loading ? (
        <Loading className={styles.spinner} withOverlay={false} />
      ) : (
        <div ref={chartContainerRef} className={styles.SVGWrapper}>
          {data?.length >= 1 ? (
            <svg
              className={styles.cascadeSVG}
              viewBox={`0 0 ${chartContainerWidth} ${
                chartHeight + 2 * axisPadding
              }`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Y-axis */}
              <line
                x1={axisPadding - 20}
                y1={0}
                x2={axisPadding - 20}
                y2={chartHeight}
                stroke="black"
              />

              {/* Y-axis intervals */}
              {scale.map((value, index) => (
                <g key={index}>
                  <line
                    x1={axisPadding}
                    y1={chartHeight - (value / maxValue) * chartHeight}
                    x2={chartContainerWidth - axisPadding}
                    y2={chartHeight - (value / maxValue) * chartHeight}
                    stroke="#C0C0C0"
                    strokeDasharray="5,5"
                  />
                  <line
                    x1={axisPadding - 25}
                    y1={chartHeight - (value / maxValue) * chartHeight}
                    x2={axisPadding - 25}
                    y2={chartHeight - (value / maxValue) * chartHeight}
                    stroke="black"
                  />
                  <text
                    x={axisPadding - 30}
                    y={chartHeight - (value / maxValue) * chartHeight + 5}
                    textAnchor="end"
                    fontSize="10"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {/* Bars */}
              {data.map((d, index) => (
                <g key={index}>
                  <rect
                    key={d.text}
                    x={axisPadding + index * (barWidth + barSpacing)}
                    y={chartHeight - (d.total / maxValue) * chartHeight}
                    width={barWidth}
                    height={(d.total / maxValue) * chartHeight}
                    className={styles.bars}
                    onMouseOver={(evt) => handleMouseOver(evt, d)}
                    onPointerOut={handleMouseOut}
                  />
                  {tooltip.visible && (
                    <Tooltip x={tooltip.x} y={tooltip.y} data={tooltip.data} />
                  )}
                </g>
              ))}

              {/*......................legend............................*/}
              <g>
                <text x={0} y={chartHeight + 50} fontSize="10">
                  Proportion of services %
                </text>
                <text x={0} y={chartHeight + 75} fontSize="10">
                  Average turnaround time
                </text>
              </g>

              <g>
                {data.map((d, index) => (
                  <>
                    {/*..........LABEL...................*/}
                    <text
                      key={d.text}
                      x={
                        axisPadding +
                        index * (barWidth + barSpacing) +
                        barWidth / 2
                      }
                      y={chartHeight + 25}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="500"
                      className={styles.labelText}
                    >
                      {d.text}
                    </text>
                    {/*..............PERCENTAGE..................*/}
                    {index !== 0 && (
                      <text
                        key={d.index}
                        x={
                          axisPadding +
                          index * (barWidth + barSpacing) +
                          barWidth / 2
                        }
                        y={chartHeight + 50}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="600"
                        className={styles.percentageText}
                      >
                        {Math.round(d.percentage * 100) / 100}%
                      </text>
                    )}
                    {/*...............TURNAROUND TIME........................*/}
                    {index !== 0 && (
                      <text
                        key={index}
                        x={
                          axisPadding +
                          index * (barWidth + barSpacing) +
                          barWidth / 2
                        }
                        y={chartHeight + 75}
                        textAnchor="middle"
                        fontSize="10"
                        className={styles.labelText}
                      >
                        {Math.round(d.averageTurnaroundTimeMonths * 100) / 100}{" "}
                        Months
                      </text>
                    )}
                    {/*.........................ARROW........................*/}
                    {index !== data.length - 1 && (
                      <svg
                        width={12}
                        key={index}
                        x={
                          axisPadding +
                          index * (barWidth + barSpacing) +
                          barWidth +
                          barSpacing / 1.5
                        }
                        y={chartHeight / 2}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className={styles.arrow}
                      >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                      </svg>
                    )}
                  </>
                ))}
              </g>
            </svg>
          ) : (
            <Loading className={styles.spinner} withOverlay={false} />
          )}
        </div>
      )}
    </div>
  );
};

export default SVGChart;
