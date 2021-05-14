import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { SidebarProps } from "./SidebarProps";
import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const Sidebar = ({
  children,
  items,
  languages,
  onLogout,
  open = false,
}: SidebarProps) => {
  useWindowSize();
  if (window.matchMedia('only screen and (max-width: 768px)').matches) {
    return <MobileSidebar items={items} languages={languages} open={open} onLogout={onLogout}>{children}</MobileSidebar>
  }
  return (
    <DesktopSidebar items={items} languages={languages} open={open} onLogout={onLogout} >
      {children}
    </DesktopSidebar>
  );
};
