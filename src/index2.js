import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getSumObj = (keys, obj, sign, resultObj = {}) => {
  const copyResultObj = resultObj;
  keys.map((key) => {
    copyResultObj[`${sign} ${key}`] = obj[key];
    return copyResultObj;
  });
  return copyResultObj;
};

const getIntercrctionObj = (keys, obj1, obj2, resultObj) => {
  const copyResultObj = resultObj;
  keys.map((key) => {
    if (obj1[key] === obj2[key]) {
      copyResultObj[`  ${key}`] = obj1[key];
      return copyResultObj;
    }
    copyResultObj[`- ${key}`] = obj1[key];
    copyResultObj[`+ ${key}`] = obj2[key];
    return copyResultObj;
  });
  return copyResultObj;
};

const genDiff = (file1, file2) => {
  const filepath1 = path.resolve(file1);
  const filepath2 = path.resolve(file2);

  const obj1 = JSON.parse(fs.readFileSync(filepath1, 'latin1'));
  const obj2 = JSON.parse(fs.readFileSync(filepath2, 'latin1'));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diffKeys1 = _.difference(keys1, keys2);
  const diffKeys2 = _.intersection(keys1, keys2);
  const diffKeys3 = _.difference(keys2, keys1);

  const newObj = getSumObj(diffKeys1, obj1, '-');
  getIntercrctionObj(diffKeys2, obj1, obj2, newObj);
  getSumObj(diffKeys3, obj2, '+', newObj);
  console.log(4, newObj);
  const file3 = JSON.stringify(newObj);
  console.log(5, file3);
  const file4 = JSON.parse(file3);
  console.log(6, file4);
};

export default genDiff;
