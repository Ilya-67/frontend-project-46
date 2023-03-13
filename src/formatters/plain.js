import _ from 'lodash';

const getUpdateValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diffTree, strPath = '') => {
  const resultArray = diffTree.flatMap((item) => {
    const [differenceKey, [key, value1, value2]] = item;
    const updateValue1 = getUpdateValue(value1);
    const property = `${strPath}${key}`;
    switch (differenceKey) {
      case 'changed': {
        const updateValue2 = getUpdateValue(value2);
        return `Property '${property}' was updated. From ${updateValue1} to ${updateValue2}`;
      }
      case 'nested': {
        const newProperty = `${property}.`;
        return formatPlain(value1, newProperty);
      }
      case 'deleted': return `Property '${property}' was removed`;
      case 'added': return `Property '${property}' was added with value: ${updateValue1}`;
      case 'unchanged': return undefined;
      default: throw new Error(`${differenceKey} unknown action status!`);
    }
  });
  return _.compact(resultArray).join('\n');
};

export default formatPlain;
