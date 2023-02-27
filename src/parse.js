import yaml from 'js-yaml';

const parse = (formatFile, file) => {
  switch (formatFile) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`${formatFile} unknown file type!`);
  }
};

export default parse;
