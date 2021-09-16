import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T {
  // ref is a generic object whose current property is mutable
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
