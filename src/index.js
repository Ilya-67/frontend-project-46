import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getDiffTree from './diffTree.js';
import formatResult from './formatters/index.js';

const extnameFile = (file) => path.extname(file).slice(1);

const contentFile = (file) => fs.readFileSync(path.resolve(file), 'utf8');

const genDiff = (file1, file2, style = 'stylish') => {
  const obj1 = parse(extnameFile(file1), contentFile(file1));
  const obj2 = parse(extnameFile(file2), contentFile(file2));
  const diffTree = getDiffTree(obj1, obj2);
  return formatResult(diffTree, style);
};

export default genDiff;
