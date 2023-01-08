import _ from 'lodash';

const getUpdateValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const setFormatingObj = (diffTree, strPath) => {
  const resultArray = diffTree.flatMap((item) => {
    const key = item[1][0];
    const value = getUpdateValue(item[1][1]);
    const property = `${strPath}${key}`;
    switch (item[0]) {
      case 'changed': {
        const value2 = getUpdateValue(item[1][2]);
        return `Property '${property}' was updated. From ${value} to ${value2}`;
      } 
      case 'nested': {
        const newProperty = property + ".";
        return setFormatingObj(item[1][1], newProperty);
      } 
      case 'deleted': return `Property '${property}' was removed`;
      case 'added': return `Property '${property}' was added with value: ${value}`;
      case 'unchanged': return undefined;
      default: throw new Error(`${item[0]} unknown action status!`);
    }
  });
  return _.compact(resultArray);
};

const setPlainFormat = (newObj) => setFormatingObj(newObj, '').join('\n');

export default setPlainFormat;
