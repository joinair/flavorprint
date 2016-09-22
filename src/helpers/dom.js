
export const getElWidth = (el) => {
  const width = el.offsetWidth;
  const marginLeft = parseInt(window.getComputedStyle(el).getPropertyValue('margin-left'), 10);
  const marginRight = parseInt(window.getComputedStyle(el).getPropertyValue('margin-right'), 10);

  return width + marginLeft + marginRight;
};

export default { getElWidth };
