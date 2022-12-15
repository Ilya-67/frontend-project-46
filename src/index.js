//import _ from 'lodash';
import { getIntersectionObj, getJoinKey } from './utils.js';
import getParseFile from './parse.js';
import doFormattingResult from './formatters/index.js';

const genDiff = (file1, file2, style) => {
  const obj1 = getParseFile(file1);
  const obj2 = getParseFile(file2);  
  const jointKeys = getJoinKey(obj1, obj2);
  const newObj = getIntersectionObj(jointKeys, obj1, obj2)
  
  return doFormattingResult(newObj, style);
};

export default genDiff;
