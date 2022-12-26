import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename);
const getFixturesPath = (referenceFileName) => path.join(dirname1, '..', '__fixtures__', referenceFileName);

const style1 = 'stylish';
const style2 = 'plain';
const style11 = { format: 'stylish' };
const style3 = 'json';
const style4 = 'yml';

const file1 = getFixturesPath('test1.json');
const file2 = getFixturesPath('test3.json');
const file3 = getFixturesPath('test2.yml');
const file4 = getFixturesPath('result_JSON.txt');

const result1 = fs.readFileSync(getFixturesPath('result_stylish1.txt'), 'utf8').trimEnd();

const result2 = fs.readFileSync(getFixturesPath('result_stylish2.txt'), 'utf8').trimEnd();

const result3 = fs.readFileSync(getFixturesPath('result_plain.txt'), 'utf8').trimEnd();

const result4 = fs.readFileSync(getFixturesPath('result_JSON.txt'), 'utf8').trimEnd();

test('gendiff stylish', () => {
  expect(genDiff(file1, file3, style1)).toEqual(result1);
});

test('gendiff with empty file', () => {
  expect(genDiff(file1, file2, style11)).toBe(result2);
});

test('gendiff plain', () => {
  expect(genDiff(file1, file3, style2)).toBe(result3);
});

test('gendiff json', () => {
  expect(genDiff(file1, file3, style3)).toBe(result4);
});

test('gendiff Error style', () => {
  function gendiffStyleError() {
    genDiff(file1, file2, style4);
  }
  expect(gendiffStyleError).toThrow(new Error('Unknown style format!'));
});

test('gendiff Error file type', () => {
  function typeFileError() {
    genDiff(file1, file4, style2);
  }
  expect(typeFileError).toThrow(new Error('Unknown file type!'));
});
