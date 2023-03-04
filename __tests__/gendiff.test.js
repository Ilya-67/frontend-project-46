import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename);
const getFilePath = (referenceFileName) => path.join(dirname1, '..', '__fixtures__', referenceFileName);

describe.each([
  {
    a: 'file1.json', b: 'file2.yml', style: undefined, expected: 'result_stylish.txt'
  }, 
  { 
    a: 'file1.json', b: 'file3.yaml', style: 'stylish', expected: 'result_with_empty_file.txt'
  },
  {
    a: 'file1.json', b: 'file2.yml', style: 'plain', expected: 'result_plain.txt'
  },
  {
    a: 'file1.json', b: 'file2.yml', style: 'json', expected: 'result_JSON.txt'
  },
])('test', (
  { a, b, style, expected }
  ) => {
  test('gendiff', () => {
    const file1 = getFilePath(a);
    const file2 = getFilePath(b);
    const result = fs.readFileSync(getFilePath(expected), 'utf8').trimEnd();
    expect(genDiff(file1, file2, style)).toBe(result);
  });
});
