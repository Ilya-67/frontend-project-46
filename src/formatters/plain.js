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
  const resultArray = [];
  let i = 0;
  while (i < workingArray.length) { 
    const key = workingArray[i][0];
    const value = workingArray[i][1];
    if (key.startsWith('-')) {
      const propertyObj = `${strPath}${key.slice(2)}`;
      const notchValue = getUpdateValue(value);
      const insertValue = getUpdateValue(workingArray[i + 1][1]);
      const result = setFormatResultItem(notchValue, insertValue, propertyObj);
      resultArray.push(result);
      i += 1;
    } if (_.isObject(value)) {
        resultArray.push(setFormatingObj(value, `${strPath}${key}.`));
    } 
    i += 1;
  } 
  return _.flatten(resultArray);
};

const setPlainFormat = (newObj) => {
  const resultArray = setFormatingObj(newObj, '');
  const resultString = resultArray.join('\n').replaceAll('"', '');
  console.log(resultString);
  return resultString
}

export default setPlainFormat;
