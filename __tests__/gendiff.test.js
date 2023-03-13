import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename);
const getFilePath = (referenceFileName) => path.join(dirname1, '..', '__fixtures__', referenceFileName);

describe.each([['stylish'], ['plain'], ['json']])('%s fomatter', (fomatter) => {
  const expected = fs.readFileSync(getFilePath(`${fomatter}.txt`), 'utf8').trimEnd();
  
  test.each([['json'], ['yml']])('%s files', (extension) => {
    const filepath1 = getFilePath(`file1.${extension}`);
    const filepath2 = getFilePath(`file2.${extension}`);
    
    expect(genDiff(filepath1, filepath2, fomatter)).toBe(expected);
  });
});
