export const formatDataAgainstTime = (data) => {
  if (data === undefined) return;
  let bottomAxesArray;
  if (data?.summary) bottomAxesArray = Object.keys(data?.summary["groupYear"]);
  else if (data["groupYear"]) bottomAxesArray = Object.keys(data["groupYear"]);
  else return;

  const formattedData = bottomAxesArray.map((item) => {
    const returnObject = {};
    returnObject["groupYear"] = item;

    let clients;
    if (data?.summary) clients = data?.summary["groupYear"][item];
    else clients = data["groupYear"][item];
    returnObject["clients"] = clients;

    return returnObject;
  });

  return formattedData;
};
