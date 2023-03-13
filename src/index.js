import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getDiffTree from './diffTree.js';
import formatResult from './formatters/index.js';

const getExtname = (filepath) => path.extname(filepath).slice(1);

const getContent = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');

const genDiff = (filepath1, filepath2, style = 'stylish') => {
  const data1 = parse(getExtname(filepath1), getContent(filepath1));
  const data2 = parse(getExtname(filepath2), getContent(filepath2));
  const diffTree = getDiffTree(data1, data2);
  return formatResult(diffTree, style);
};

export default genDiff;
