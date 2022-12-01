import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const file1 = '__fixtures__/test1.json';
const file2 = '__fixtures__/test2.json';
const file3 = '__fixtures__/test3.json';
const file4 = '__fixtures__/test11.yml';
const file5 = '__fixtures__/test21.yml';
const file6 = '__fixtures__/test31.yml';

const result1 = `{
  key: value
- key2: 20
+ key2: 10
- key3: value3
- key4: false
+ key4: true
+ key5: value3
}`;
const result2 = `{
- key: value
- key2: 20
- key3: value3
- key4: false
}`;

test('gendiff JSON', () => {
  expect(genDiff(file1, file2)).toBe(result1);
});

test('gendiff JSON', () => {
  expect(genDiff(file1, file3)).toBe(result2);
});


test('gendiff YAML', () => {
  expect(genDiff(file4, file5)).toBe(result1);
});

test('gendiff YAML', () => {
  expect(genDiff(file4, file6)).toBe(result2);
});

