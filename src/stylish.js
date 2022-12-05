import { dump } from 'js-yaml';

const getFormatResult = (str) => {
  const result = str.replaceAll('"', '').replaceAll(':', ': ');
  let k = 0;
  const space = ' ';
  const a = [];
  for (let item of result) {
    if (item === '{') {
      k += 4;
      item = `{\n${space.repeat(k)}`;
    } if (item === ',') {
        item = `\n${space.repeat(k)}`;
    } if (item === '}') {
        k -= 4;
        item = `\n${space.repeat(k)}}`;
    } if (item === '+' || item === '-') {
        item = `\b\b${item}`;
    }
    a.push(item);    
  }
  const b = a.join().replaceAll(',', '');
  console.log(b);
  return b;
};

export default getFormatResult;