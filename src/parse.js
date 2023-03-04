import yaml from 'js-yaml';

const parse = (extnameFile, file) => {
  switch (extnameFile) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`${extnameFile} unknown format!`);
  }
};

export default parse;
