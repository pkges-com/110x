export * from './const';
export * from './types';

export const debounce = (func: any, waitTime: number, maxWait?: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  let maxWaitTimeout: ReturnType<typeof setTimeout>;
  let maxWaitExecuted = false;

  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);

      // clear other timeout
      clearTimeout(maxWaitTimeout);
      maxWaitExecuted = false;
    }, waitTime);

    if (maxWait && !maxWaitExecuted) {
      maxWaitExecuted = true;
      console.log('triggered maxWait');

      maxWaitTimeout = setTimeout(() => {
        func(...args);
        maxWaitExecuted = false;

        console.log('maxWait executed');

        // clear other timeout
        clearTimeout(timeout);
      }, maxWait);
    }
  };
};
