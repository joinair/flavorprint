
export default class Timer {
  constructor(callback, delay) {
    let timerId;
    let start;
    let remaining = delay;

    this.pause = () => {
      clearTimeout(timerId);
      remaining -= new Date() - start;
    };

    this.resume = () => {
      start = new Date();
      clearTimeout(timerId);
      timerId = setTimeout(callback, remaining);
    };

    this.clear = () => {
      clearTimeout(timerId);
    };

    this.resume();
  }
}
