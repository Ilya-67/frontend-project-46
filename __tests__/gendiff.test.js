import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import setJsonFormat from '../src/formatters/json.js';
import setStylishFormat from '../src/formatters/stylish.js';
import setPlainFormat from '../src/formatters/plain.js';



const filename = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename);
const getFixturesPath = (referenceFileName) => path.join(dirname1, '..', '__fixtures__', referenceFileName);

const style1 = 'stylish';
const style2 = 'plain';
const style11 = { format: 'stylish' };
const style3 = 'json';
const style4 = 'yml';

const file1 = getFixturesPath('test1.json');
const file2 = getFixturesPath('test3.yaml');
const file3 = getFixturesPath('test2.yml');
const file4 = getFixturesPath('result_JSON.txt');
const diffTree = [
  [ 'unchanged', [ 'key', 'value' ] ],
  [ 'rewritten', [ 'key2', 20, 10 ] ],
  [ 'deleted', [ 'key3', 'value3' ] ],
  [ 'changed', [ 'key4', false, true ] ],
  [ 'added', [ 'key5', 'value3' ] ],
  [ 'nested', [ 'key7', 'value7' ] ]
];

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
    genDiff(file1, file3, style4);
  }
  expect(gendiffStyleError).toThrow(new Error('yml unknown style format!'));
});

test('gendiff Error file type', () => {
  function typeFileError() {
    genDiff(file1, file4, style2);
  }
  expect(typeFileError).toThrow(new Error('txt unknown file type!'));
});

test('gendiff typeError', () => {
  function typeFileError1() {
    setJsonFormat(diffTree);
  }
  function typeFileError2() {
    setStylishFormat(diffTree);
  }
  function typeFileError3() {
    setPlainFormat(diffTree);
  }
  expect(typeFileError1).toThrow(new Error('rewritten unknown action status!'));
  expect(typeFileError2).toThrow(new Error('rewritten unknown action status!'));
  expect(typeFileError3).toThrow(new Error('rewritten unknown action status!'));
});
