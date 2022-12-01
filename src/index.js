import _ from 'lodash';
import getIntersectionObj from './utils.js';
import getParseFile from './parse.js';
import { dump } from 'js-yaml';

const genDiff = (file1, file2) => {
  const obj1 = getParseFile(file1);
  const obj2 = getParseFile(file2);  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diffKeys1 = _.difference(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const diffKeys2 = _.difference(keys2, keys1);
  const jointKeys = _.sortBy(_.concat(diffKeys1, intersectionKeys, diffKeys2));

  const result = dump(getIntersectionObj(jointKeys, obj1, obj2));
  console.log(`{\n${result.replaceAll("'", '').trimEnd()}\n}`);
  return (`{\n${result.replaceAll("'", '').trimEnd()}\n}`);
};

export default genDiff;
