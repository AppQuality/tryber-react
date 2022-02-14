import { useEffect } from "react";

export const useTimeout = (
  delay: number,
  callback: () => void,
  deps: number[]
) =>
  useEffect(() => {
    let timer1 = setTimeout(() => {
      callback();
    }, delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, deps);
