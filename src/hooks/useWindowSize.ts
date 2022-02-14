import { useLayoutEffect, useState } from "react";

function debounce(callback: () => void, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (typeof timer !== "undefined") clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      callback();
    }, wait);
  };
}

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const debounceUpdateSize = debounce(function () {
      setSize([window.innerWidth, window.innerHeight]);
    }, 300);

    window.addEventListener("resize", debounceUpdateSize);

    debounceUpdateSize();

    return () => window.removeEventListener("resize", debounceUpdateSize);
  }, []);

  return size;
}
