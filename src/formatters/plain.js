import _ from "lodash";

const getUpdateValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof(value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const setFormatResultItem = (notchValue, insertValue, propertyObj) => {
  if (notchValue === undefined) {
    return `Property '${propertyObj}' was added with value: ${insertValue}`;
  } if (insertValue === undefined) {
    return`Property '${propertyObj}' was removed`;
  } if (notchValue !== undefined && insertValue !== undefined) {
    return`Property '${propertyObj}' was updated. From ${notchValue} to ${insertValue}`;
  }
};

const setFormatingObj = (newObj, strPath) => {
  const workingArray = Object.entries(newObj);
  const resultArray = workingArray.flatMap((item, index) => {
    const key = item[0];
    const value = item[1];
    if (key.startsWith('-')) {
      const propertyObj = `${strPath}${key.slice(2)}`;
      const notchValue = getUpdateValue(value);
      const insertValue = getUpdateValue(workingArray[index + 1][1]);
      return setFormatResultItem(notchValue, insertValue, propertyObj);
    } if (_.isObject(value)) {
      return (setFormatingObj(value, `${strPath}${key}.`));
    } 
  });  
  return _.compact(resultArray);
};

const setPlainFormat = (newObj) => {
  return setFormatingObj(newObj, '').join('\n');
}

export default setPlainFormat;