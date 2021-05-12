import { DesktopSidebar } from "./DesktopSidebar";
import { SidebarProps } from "./SidebarProps";

export const Sidebar = ({
  children,
  items,
  languages,
  open = false,
}: SidebarProps) => {
  return (
    <DesktopSidebar items={items} languages={languages} open={open}>
      {children}
    </DesktopSidebar>
  );
};
