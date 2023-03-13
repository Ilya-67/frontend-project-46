const getResultObject = (diffTree) => {
  const resultArr = diffTree.flatMap((item) => {
    const [differenceKey, [key, value1, value2]] = item;
    switch (differenceKey) {
      case 'unchanged': {
        return [item[1]];
      }
      case 'changed': {
        return [[`- ${key}`, value1], [`+ ${key}`, value2]];
      }
      case 'deleted': {
        return [[`- ${key}`, value1]];
      }
      case 'added': {
        return [[`+ ${key}`, value1]];
      }
      case 'nested': {
        return [[key, getResultObject(value1)]];
      }
      default: throw new Error(`${differenceKey} unknown action status!`);
    }
  });
  return Object.fromEntries(resultArr);
};

const formatJson = (diffTree) => JSON.stringify(getResultObject(diffTree), 0, 2);

export default formatJson;
