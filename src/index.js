import getParseFile from './parse.js';
import doFormattingResult from './formatters/index.js';
import path from 'path';
import _ from 'lodash';

export const getIntersectionObj = (keys, obj1, obj2) => {
  const newObj = {};
  keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const childrenObj1 = obj1[key];
      const childrenObj2 = obj2[key];
      const childrenKey = getJoinKey(childrenObj1, childrenObj2);
      newObj[`${key}`] = getIntersectionObj(childrenKey, childrenObj1, childrenObj2);
      return JSON.stringify(newObj);  
    }
    if (obj1[key] === obj2[key]) {
      newObj[`${key}`] = obj1[key];
      return newObj;
    }
    newObj[`- ${key}`] = obj1[key];
    newObj[`+ ${key}`] = obj2[key];
    return newObj;
  });
  return newObj;
};

export const getJoinKey = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const diffKeys1 = _.difference(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const diffKeys2 = _.difference(keys2, keys1);
  return _.sortBy(_.concat(diffKeys1, intersectionKeys, diffKeys2));
};

const genDiff = (file1, file2, style) => {
  const formatFile1 = path.extname(file1);
  const pathfile1 = path.resolve(file1);
  const formatFile2 = path.extname(file2);
  const pathfile2 = path.resolve(file2);
  
  const obj1 = getParseFile(formatFile1, pathfile1);
  const obj2 = getParseFile(formatFile2, pathfile2);  
  const jointKeys = getJoinKey(obj1, obj2);
  const newObj = getIntersectionObj(jointKeys, obj1, obj2)
  
  const result = doFormattingResult(newObj, style);
  console.log(result);
  return result;
};

export default genDiff;
