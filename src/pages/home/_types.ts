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

export interface CardListItemsProps {
  items: CardListItem[];
}

export interface CardListItem {
  icon: string;
  title: string;
  body: ReactNode;
}

export interface CardListItemsProps {
  items: CardListItem[];
}
