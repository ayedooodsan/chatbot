const colorList = [
  '#f44336',
  '#3f51b5',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#2196f3',
  '#00bcd4',
  '#ff9800',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#03a9f4',
  '#ff5722',
  '#795548',
  '#607d8b'
];

const colorCache = {};

const getColor = entityId => {
  if (!colorCache[entityId]) {
    colorCache[entityId] = colorList[Object.keys(colorCache).length % 18];
  }
  return colorCache[entityId];
};

export default getColor;
