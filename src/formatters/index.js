import setStylishFormat from './stylish.js';
import setPlainFormat from './plain.js';

const doFormattingResult = (newObj, style) => {
  if (style.format === 'stylish') {   
    return setStylishFormat(newObj);
  } if (style.format === 'plain') {
    return setPlainFormat(newObj);
  }
};

export default doFormattingResult;