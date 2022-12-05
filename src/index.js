import _ from 'lodash';
import { getIntersectionObj, getJoinKey } from './utils.js';
import getParseFile from './parse.js';
import getFormatResult from './stylish.js';

const genDiff = (file1, file2) => {
  const obj1 = getParseFile(file1);
  const obj2 = getParseFile(file2);  
    
  const jointKeys = getJoinKey(obj1, obj2);
  
  const result = JSON.stringify(getIntersectionObj(jointKeys, obj1, obj2));
  return getFormatResult(result);
};

export default genDiff;
