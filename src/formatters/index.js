import setStylishFormat from './stylish.js';
import setPlainFormat from './plain.js';
import setJsonFormat from './json.js';

const doFormattingResult = (newObj, style) => {
  switch(style.format) {
    case 'stylish':
      return setStylishFormat(newObj);
    case 'plain':
      return setPlainFormat(newObj);
    case 'json':
      return setJsonFormat(newObj);
    default:
      throw new Error('Unknown style format!');
  }
};

export default doFormattingResult;
