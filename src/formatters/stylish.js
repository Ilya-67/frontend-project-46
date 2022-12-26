const setStylishFormat = (obj) => {
  const str = JSON.stringify(obj, (key, value) => value, 4);
  return str.replaceAll('"', '').replaceAll(',', '').replaceAll('  +', '+').replaceAll('  -', '-');
};

export default setStylishFormat;
