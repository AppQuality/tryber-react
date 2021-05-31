export default function debounce(
  callback: (...args: any) => any,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      // @ts-ignore
      callback.apply(this, arguments);
    }, wait);
  };
}
