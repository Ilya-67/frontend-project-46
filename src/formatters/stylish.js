import _ from 'lodash';

const valueConversion = (data, replacer, stepSpace, count) => {
  if (_.isObject(data)) {
    const newData = Object.entries(data);
    const backSpace = count;
    const countSpace = count + stepSpace;
    const result = newData.flatMap((item) => {
      const [key, value] = item;
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
    const [differenceKey, [key, value1, value2]] = item;
    const updateValue1 = valueConversion(value1, replacer, stepSpace, countSpace);
    switch (differenceKey) {
      case 'nested': return `${key}: ${stringFy(value1, replacer, stepSpace, countSpace)}`;
      case 'added': return `+ ${key}: ${updateValue1}`;
      case 'deleted': return `- ${key}: ${updateValue1}`;
      case 'unchanged': return `${key}: ${updateValue1}`;
      case 'changed': {
        const updateValue2 = valueConversion(value2, replacer, stepSpace, countSpace);
        return `- ${key}: ${updateValue1},+ ${key}: ${updateValue2}`;
      }
      default:
        throw new Error(`${differenceKey} unknown action status!`);
    }
  });
  return `{\n${replacer.repeat(countSpace)}${resultArr.join()
    .replaceAll(',', `\n${replacer.repeat(countSpace)}`)}\n${replacer.repeat(backSpace)}}`;
};

const formatStylish = (diffTree) => stringFy(diffTree).replaceAll('  -', '-').replaceAll('  +', '+');

export default formatStylish;
