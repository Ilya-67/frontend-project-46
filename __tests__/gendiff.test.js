import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename);
const getFixturesPath = (referenceFileName) => path.join(dirname1, '..', '__fixtures__', referenceFileName);

const file1 = getFixturesPath('test1.json');
const file2 = getFixturesPath('test3.yaml');
const file3 = getFixturesPath('test2.yml');

const result1 = fs.readFileSync(getFixturesPath('result_stylish1.txt'), 'utf8').trimEnd();
const result2 = fs.readFileSync(getFixturesPath('result_stylish2.txt'), 'utf8').trimEnd();
const result3 = fs.readFileSync(getFixturesPath('result_plain.txt'), 'utf8').trimEnd();
const result4 = fs.readFileSync(getFixturesPath('result_JSON.txt'), 'utf8').trimEnd();

test('gendiff', () => {
  expect(genDiff(file1, file3)).toEqual(result1);
  expect(genDiff(file1, file2, { format: 'stylish' })).toBe(result2);
  expect(genDiff(file1, file3, 'plain')).toBe(result3);
  expect(genDiff(file1, file3, 'json')).toBe(result4);
});
