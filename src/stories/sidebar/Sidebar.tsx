import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { SidebarProps } from "./SidebarProps";
import useWindowSize from "../../store/useWindowSize";

export const Sidebar = ({
  children,
  items,
  languages,
  onLogout,
  onSidebarEnter,
  onSidebarLeave,
  open = false,
}: SidebarProps) => {
  useWindowSize();
  if (window.matchMedia("only screen and (max-width: 768px)").matches) {
    return (
      <MobileSidebar
        items={items}
        languages={languages}
        open={open}
        onLogout={onLogout}
      >
        {children}
      </MobileSidebar>
    );
  }
  return (
    <DesktopSidebar
      items={items}
      languages={languages}
      open={open}
      onLogout={onLogout}
      onSidebarEnter={onSidebarEnter}
      onSidebarLeave={onSidebarLeave}
    >
      {children}
    </DesktopSidebar>
  );
};
