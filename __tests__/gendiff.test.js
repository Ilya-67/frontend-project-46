import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const file1 = '__fixtures__/test1.json';
const file2 = '__fixtures__/test2.json';
const file3 = '__fixtures__/test3.json';
const file4 = '__fixtures__/test11.yml';
const file5 = '__fixtures__/test21.yml';
const file6 = '__fixtures__/test31.yml';
const style1 = { format: 'stylish' };
const style2 = { format: 'plain' };

const result1 = `{
    key: value
    \b\b- key2: 20
    \b\b+ key2: 10
    \b\b- key3: value3
    \b\b- key4: false
    \b\b+ key4: true
    \b\b+ key5: value3
    key7: {
        \b\b- baz: value1
        \b\b+ baz: value2
        foo: bar
        \b\b+ key1: {
            key12: value3
        }
        \b\b- key2: value4
    }
}`;

const result2 = `{
    \b\b- key: value
    \b\b- key2: 20
    \b\b- key3: value3
    \b\b- key4: false
    \b\b- key7: {
        foo: bar
        baz: value1
        key2: value4
    }
}`;

const result3 = 
`Property 'key2' was updated. From 20 to 10
Property 'key3' was removed
Property 'key4' was updated. From false to true
Property 'key5' was added with value: 'value3'
Property 'key7.baz' was updated. From 'value1' to 'value2'
Property 'key7.key1' was added with value: [complex value]
Property 'key7.key2' was removed`;

test('gendiff JSON', () => {
  expect(genDiff(file1, file2, style1)).toBe(result1);
});

test('gendiff JSON', () => {
  expect(genDiff(file1, file3, style1)).toBe(result2);
});

test('gendiff YAML', () => {
  expect(genDiff(file4, file5, style1)).toBe(result1);
});

test('gendiff YAML', () => {
  expect(genDiff(file4, file6, style1)).toBe(result2);
});

test('gendiff plain', () => {
  expect(genDiff(file4, file5, style2)).toBe(result3);
});
