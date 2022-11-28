import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getIntersectionObj from './util.js';

const genDiff = (file1, file2) => {
  const filepath1 = path.resolve(file1);
  const filepath2 = path.resolve(file2);
  const obj1 = JSON.parse(fs.readFileSync(filepath1, 'latin1'));
  const obj2 = JSON.parse(fs.readFileSync(filepath2, 'latin1'));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diffKeys1 = _.difference(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const diffKeys2 = _.difference(keys2, keys1);
  const jointKeys = _.sortBy(_.concat(diffKeys1, intersectionKeys, diffKeys2));

  const resultFile = JSON.stringify(getIntersectionObj(jointKeys, obj1, obj2));

  console.log(resultFile
    .replace('"', '\n ')
    .replaceAll('"', '')
    .replaceAll(',', '\n ')
    .replace('}', '\n}'));
};

export default genDiff;
