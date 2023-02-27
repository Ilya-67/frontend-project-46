import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getDiffTree from './diffTree.js';
import formatResult from './formatters/index.js';

const genDiff = (file1, file2, style = 'stylish') => {
  const styleAnswer = (_.isObject(style)) ? style.format : style;
  
  const formatFile1 = path.extname(file1).slice(1);
  const pathFile1 = path.resolve(file1);
  const contentFile1 = fs.readFileSync(pathFile1, 'utf8');
  const formatFile2 = path.extname(file2).slice(1);
  const pathFile2 = path.resolve(file2);
  const contentFile2 = fs.readFileSync(pathFile2, 'utf8');

  const obj1 = parse(formatFile1, contentFile1);
  const obj2 = parse(formatFile2, contentFile2);
  
  const diffTree = getDiffTree(obj1, obj2);
  return formatResult(diffTree, styleAnswer);
};

export default genDiff;
