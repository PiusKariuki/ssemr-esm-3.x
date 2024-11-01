export const formatWaterfallData = (data) => {
  const results = data.results;
  const TX_CURR = results.find((item) => Object.keys(item).includes("TX_CURR"))[
    "TX_CURR"
  ];

  const transferIn = results.find((item) =>
    Object.keys(item).includes("Transfer In")
  )["Transfer In"];

  const TX_NEW = results.find((item) => Object.keys(item).includes("TX_NEW"))[
    "TX_NEW"
  ];

  const TX_RTT = results.find((item) => Object.keys(item).includes("TX_RTT"))[
    "TX_RTT"
  ];

  const potentialTXCurr = results.find((item) =>
    Object.keys(item).includes("Potential TX_CURR")
  )["Potential TX_CURR"];

  const transferOut = results.find((item) =>
    Object.keys(item).includes("Transfer Out")
  )["Transfer Out"];

  const TX_DEATH = results.find((item) => Object.keys(item).includes("TX_DEATH"))[
    "TX_DEATH"
  ];

  const selfTransfer = results.find((item) =>
    Object.keys(item).includes("TX_ML_Self Transfer")
  )["TX_ML_Self Transfer"];

  const refusal = results.find((item) =>
    Object.keys(item).includes("TX_ML_Refusal/Stopped")
  )["TX_ML_Refusal/Stopped"];

  const onARTLessThanThree = results.find((item) =>
    Object.keys(item).includes("TX_ML_IIT (<3 mo)")
  )["TX_ML_IIT (<3 mo)"];

  const onARTMoreThanThree = results.find((item) =>
    Object.keys(item).includes("TX_ML_IIT (3+ mo)")
  )["TX_ML_IIT (3+ mo)"];

  const calculated = results.find((item) =>
    Object.keys(item).includes("CALCULATED TX_CURR")
  )["CALCULATED TX_CURR"];

  const processed = [
    {
      group: "TX_CURR",
      value: [0, TX_CURR],
    },
    {
      group: "Transfer In",
      value: [TX_CURR, transferIn + TX_CURR],
    },
    {
      group: "TX_NEW",
      value: [transferIn + TX_CURR, transferIn + TX_CURR + TX_NEW],
    },
    {
      group: "TX_RTT",
      value: [
        transferIn + TX_CURR + TX_NEW,
        transferIn + TX_CURR + TX_NEW + TX_RTT,
      ],
    },
    {
      group: "Potential TX_CURR",
      value: [0, potentialTXCurr],
    },
    {
      group: "Transfer Out",
      value: [potentialTXCurr - transferOut, potentialTXCurr],
    },
    {
      group: "TX_DEATH",
      value: [
        potentialTXCurr - transferOut - TX_DEATH,
        potentialTXCurr - transferOut,
      ],
    },
    {
      group: "TX_ML_Self Transfer",
      value: [
        potentialTXCurr - transferOut - TX_DEATH - selfTransfer,
        potentialTXCurr - transferOut - TX_DEATH,
      ],
    },
    {
      group: "TX_ML_Refusal/Stopped",
      value: [
        potentialTXCurr - transferOut - TX_DEATH - selfTransfer - refusal,
        potentialTXCurr - transferOut - TX_DEATH - selfTransfer,
      ],
    },
    {
      group: "TX_ML_IIT (on ART <3 mo)",
      value: [
        potentialTXCurr -
          transferOut -
          TX_DEATH -
          selfTransfer -
          refusal -
          onARTLessThanThree,
        potentialTXCurr - transferOut - TX_DEATH - selfTransfer - refusal,
      ],
    },
    {
      group: "TX_ML_IIT (on ART 3+ mo)",
      value: [
        potentialTXCurr -
          transferOut -
          TX_DEATH -
          selfTransfer -
          refusal -
          onARTLessThanThree -
          onARTMoreThanThree,
        potentialTXCurr -
          transferOut -
          TX_DEATH -
          selfTransfer -
          refusal -
          onARTLessThanThree,
      ],
    },
    {
      group: "Calculated",
      value: [0, calculated],
    },
  ];

  return processed;
};
