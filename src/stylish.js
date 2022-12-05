const getFormatResult = (str) => {
  const newString = str.replaceAll('"', '').replaceAll(':', ': ');
  let countSpaces = 0;
  const space = ' ';
  const simbolsOfString = [];
  for (let item of newString) {
    if (item === '{') {
      countSpaces += 4;
      item = `{\n${space.repeat(countSpaces)}`;
    } if (item === ',') {
        item = `\n${space.repeat(countSpaces)}`;
    } if (item === '}') {
        countSpaces -= 4;
        item = `\n${space.repeat(countSpaces)}}`;
    } if (item === '+' || item === '-') {
        item = `\b\b${item}`;
    }
    simbolsOfString.push(item);    
  }
  const result = simbolsOfString.join().replaceAll(',', '');
  console.log(result);
  return result;
};

export default getFormatResult;