import { PaginationProps } from "./PaginationProps";
import { useLayoutEffect, useState } from "react";
import { DesktopPagination } from "./DesktopPagination";
import { MobilePagination } from "./MobilePagination";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const Pagination = (args: PaginationProps) => {
  useWindowSize();
  if (window.matchMedia("only screen and (max-width: 768px)").matches) {
    return <MobilePagination {...args} />;
  }
  return <DesktopPagination {...args} />;
};
