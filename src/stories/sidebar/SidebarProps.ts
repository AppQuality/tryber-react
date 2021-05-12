import { SidebarIconProps } from "./SidebarIcon";
import { SidebarTextProps } from "./SidebarText";
import { LanguageItem } from "./LanguageIcons";

export interface SidebarItemProps extends SidebarIconProps, SidebarTextProps {}

export interface SidebarProps {
  children?: React.ReactNode;
  items: Array<SidebarItemProps>;
  languages: {
    current: LanguageItem;
    others: Array<LanguageItem>;
  };
  open?: boolean;
}
