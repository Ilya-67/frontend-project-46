const setStylishFormat = (obj) => {
  const str = JSON.stringify(obj, function replacer(key, value) {
    return value;
  }, 4);
  return str.replaceAll('"', '').replaceAll(',', '').replaceAll('  +', '+').replaceAll('  -', '-');
};

export default setStylishFormat;