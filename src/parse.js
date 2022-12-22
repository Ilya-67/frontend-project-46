import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const getParseFile = (formatFile, filepath) => {
  switch(formatFile) {
    case '.json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case '.yml':
      return yaml.load(fs.readFileSync(filepath, 'utf8'));
    default:
      throw new Error('Unknown file format!');
  }
}

export default getParseFile;
