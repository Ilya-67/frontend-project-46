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
    \b\b- key2: 20
    \b\b+ key2: 10
    \b\b- key3: value3
    \b\b- key4: false
    \b\b+ key4: true
    \b\b+ key5: value3
    key7: {
        foo: bar
    }
}`;

const result2 = `{
    \b\b- key: value
    \b\b- key2: 20
    \b\b- key3: value3
    \b\b- key4: false
    \b\b- key7: {
        foo: bar
    }
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
