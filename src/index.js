import _ from 'lodash';
import path from 'path';
import getParseFile from './parse.js';
import formatResult from './formatters/index.js';

export const getJoinKey = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const diffKeys1 = _.difference(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const diffKeys2 = _.difference(keys2, keys1);
  return _.sortBy(_.concat(diffKeys1, intersectionKeys, diffKeys2));
};

export const getDiffTree = (keys, obj1, obj2) => {
  const diffTree = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const childrenObj1 = obj1[key];
      const childrenObj2 = obj2[key];
      const childrenKey = getJoinKey(childrenObj1, childrenObj2);
      return ['nested', [key, getDiffTree(childrenKey, childrenObj1, childrenObj2)]];
    } if (obj1[key] === obj2[key]) {
      return ['unchanged', [key, obj1[key]]];
    } if (_.isUndefined(obj1[key])) {
      return ['added', [key, obj2[key]]];
    } if (_.isUndefined(obj2[key])) {
      return ['deleted', [key, obj1[key]]];
    }
    return ['changed', [key, obj1[key], obj2[key]]];
  });
  return diffTree;
};

const genDiff = (file1, file2, style = 'stylish') => {
  const styleAnswer = (_.isObject(style)) ? style.format : style;
  const formatFile1 = path.extname(file1).slice(1);
  const pathfile1 = path.resolve(file1);
  const formatFile2 = path.extname(file2).slice(1);
  const pathfile2 = path.resolve(file2);
  
  const obj1 = getParseFile(formatFile1, pathfile1);
  const obj2 = getParseFile(formatFile2, pathfile2);
  const jointKeys = getJoinKey(obj1, obj2);
  const diffTree = getDiffTree(jointKeys, obj1, obj2);
  const result = formatResult(diffTree, styleAnswer);
  console.log(result);
  return result;
};

export default genDiff;
