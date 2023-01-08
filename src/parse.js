import fs from 'fs';
import yaml from 'js-yaml';

const getParseFile = (formatFile, filepath) => {
  switch (formatFile) {
    case 'json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case 'yml':
      return yaml.load(fs.readFileSync(filepath, 'utf8'));
    case 'yaml':
      return yaml.load(fs.readFileSync(filepath, 'utf8'));
    default:
      throw new Error(`${formatFile} unknown file type!`);
  }
};

export default getParseFile;
