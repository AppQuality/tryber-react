import { ReactNode } from "react";

export interface StyledRectProps {
  rx: string;
}

export interface DataListProps {
  data: DataListItem[];
}

export interface DataListItem {
  name: string;
  icon: string;
  text: string;
}
