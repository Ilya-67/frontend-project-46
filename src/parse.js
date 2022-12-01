import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const getParseFile = (file) => {
  const formatFile = path.extname(file);
  const filepath = path.resolve(file);
  if (formatFile === '.json') {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } if (formatFile === '.yml') {
    return yaml.load(fs.readFileSync(filepath, 'utf8'));
  }
}


export default getParseFile;
