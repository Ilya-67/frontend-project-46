import setStylishFormat from './stylish.js';
import setPlainFormat from './plain.js';
import setJsonFormat from './json.js';

const doFormattingResult = (newObj, style) => {
  if (style.format === 'stylish') {   
    return setStylishFormat(newObj);
  } if (style.format === 'plain') {
    return setPlainFormat(newObj);
  } if (style.format === 'json') {
    return setJsonFormat(newObj);
  }
};

export default doFormattingResult;
