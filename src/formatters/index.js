import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatResult = (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return formatJson(diffTree);
    default:
      throw new Error(`${style} unknown style format!`);
  }
};

export default formatResult;
