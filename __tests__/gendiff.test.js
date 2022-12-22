import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const file1 = '__fixtures__/test1.json';
const file2 = '__fixtures__/test3.json';
const file3 = '__fixtures__/test2.yml';
const file4 = '__fixtures__/result_JSON.txt'
const style1 = { format: 'stylish' };
const style2 = { format: 'plain' };
const style3 = { format: 'json'};
const style4 = { format: 'yml'};

const result1 = fs.readFileSync('./__fixtures__/result_stylish1.txt', 'utf8').trimEnd();

const result2 = fs.readFileSync('./__fixtures__/result_stylish2.txt', 'utf8').trimEnd();

const result3 = fs.readFileSync('./__fixtures__/result_plain.txt', 'utf8').trimEnd();

const result4 = fs.readFileSync('./__fixtures__/result_JSON.txt', 'utf8').trimEnd();

test('gendiff stylish', () => {
  expect(genDiff(file1, file3, style1)).toEqual(result1);
});

test('gendiff with empty', () => {
  expect(genDiff(file1, file2, style1)).toBe(result2);
});

test('gendiff plain', () => {
  expect(genDiff(file1, file3, style2)).toBe(result3);
});

test('gendiff json', () => {
  expect(genDiff(file1, file3, style3)).toBe(result4);
});

test('gendiff Error', () => {
  function gendiffTXT() {
    genDiff(file1, file2, style4);
  }
  expect(gendiffTXT).toThrow(new Error('Unknown style format!'));
});

test('gendiff Error', () => {
  function formaterYML() {
    genDiff(file1, file4, style2);
  }
  expect(formaterYML).toThrow(new Error('Unknown file format!'));
});
