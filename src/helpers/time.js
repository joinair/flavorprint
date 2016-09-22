
export const twoDigitNumber = (num) => {
  if (num < 10) {
    return `0${num}`;
  }

  return `${num}`;
};

export const splitTimeComponents = (value) => {
  const seconds = Math.floor(value) % 60;
  const minutes = Math.floor(value / 60) % 60;
  const hours = Math.floor(value / 60 / 60);
  return { seconds, minutes, hours };
};

export default { twoDigitNumber, splitTimeComponents };
