export const formatViralLoadData = (data) => {
  const processedData = data?.summary?.groupYear?.map((item) => {
    const keys = Object.keys(item);
    return {
      value: item[keys[0]],
      group: keys[0],
    };
  });
  return processedData;
};
