import setStylishFormat from './stylish.js';
import setPlainFormat from './plain.js';
import setJsonFormat from './json.js';

const formatResult = (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return setStylishFormat(diffTree);
    case 'plain':
      return setPlainFormat(diffTree);
    case 'json':
      return setJsonFormat(diffTree);
    default:
      throw new Error(`${style} unknown style format!`);
  }
};

export default formatResult;
