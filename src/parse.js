import yaml from 'js-yaml';

const parse = (extname, data) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`${extname} unknown format!`);
  }
};

export default parse;
