const setResultObject = (diffTree) => {
  const resultArr = diffTree.flatMap((item) => {
    const differenceKey = item[0];
    const key = item[1][0];
    const value1 = item[1][1];
    switch (differenceKey) {
      case 'unchanged': {
        return [item[1]];
      }
      case 'changed': {
        const value2 = item[1][2];
        return [[`- ${key}`, value1], [`+ ${key}`, value2]];
      }
      case 'deleted': {
        return [[`- ${key}`, value1]];
      }
      case 'added': {
        return [[`+ ${key}`, value1]];
      }
      case 'nested': {
        return [[key, setResultObject(value1)]];
      }
      default: throw new Error(`${differenceKey} unknown action status!`);
    }
  });
  return Object.fromEntries(resultArr);
};

const setJsonFormat = (diffTree) => JSON.stringify(setResultObject(diffTree), 0, 2);

export default setJsonFormat;
