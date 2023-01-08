import _ from "lodash";

const valueConversion = (data, replacer, stepSpace, count) => {
  if (_.isObject(data)) {
    const newData = Object.entries(data);
    const backSpace = count;
    const countSpace = count + stepSpace;
    const result = newData.flatMap((item) => {
      const key = item[0];
      const value = item[1];
      if (typeof (value) === 'object' && value !== null) {
        return `${key}: ${valueConversion(value, replacer, stepSpace, countSpace)}`;
      }
      return `${key}: ${value}`;
    });
    return `{\n${replacer.repeat(countSpace)}${result.join().replaceAll('"', '')
      .replaceAll(',', `\n${replacer.repeat(countSpace)}`)}\n${replacer.repeat(backSpace)}}`;
  }
  return data;
};

const stringFy = (data, replacer = ' ', stepSpace = 4, count = 0) => {
  const backSpace = count;
  const countSpace = count + stepSpace;
  const resultArr = data.flatMap((item) => {
    const differenceKey = item[0];
    const key = item[1][0];
    const value = item[1][1];
    const value1 = valueConversion(value, replacer, stepSpace, countSpace);
    switch (item[0]) {
      case 'nested': return `${key}: ${stringFy(value, replacer, stepSpace, countSpace)}`;
      case 'added': return `+ ${key}: ${value1}`;
      case 'deleted': return `- ${key}: ${value1}`;
      case 'unchanged': return `${key}: ${value1}`;
      case 'changed': {
        const value2 = valueConversion(item[1][2], stepSpace, countSpace);
        return `- ${key}: ${value1},+ ${key}: ${value2}`;
      }
      default:
        throw new Error(`${item[0]} unknown action status!`);
    } 
  }); 
  return `{\n${replacer.repeat(countSpace)}${resultArr.join()
    .replaceAll(',', `\n${replacer.repeat(countSpace)}`)}\n${replacer.repeat(backSpace)}}`;
};

const setStylishFormat = (diffTree) =>  stringFy(diffTree).replaceAll('  -', '-').replaceAll('  +', '+');

export default setStylishFormat;
