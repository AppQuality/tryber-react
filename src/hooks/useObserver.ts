import React, { useEffect, useRef, useState, useCallback } from "react";
const defaultParams = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
type useObserverResponse = [
  (node?: Element | null) => void,
  IntersectionObserverEntry | undefined
];
export function useObserver<T extends HTMLElement>(options = defaultParams) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  let ref = useRef<T>(null);
  const [state, setState] = useState(false);
  const setRef = useCallback((node) => {
    if (node !== null) {
      // @ts-ignore
      ref.current = node;
      setState(true);
    }
  }, []);

  const callBack: IntersectionObserverCallback = (entries) => {
    if (entries[0]) setEntry(entries[0]);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    if (state && ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options, state]);

  return [setRef, entry] as useObserverResponse;
}
