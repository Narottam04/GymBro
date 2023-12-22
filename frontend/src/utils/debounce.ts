type Callback = (...args: string[]) => void;
type TimerId = ReturnType<typeof setTimeout>;

export function debounce(cb: Callback, delay = 1000) {
  let timeout: TimerId;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
