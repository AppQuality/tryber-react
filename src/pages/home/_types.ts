import { ReactNode } from "react";

export interface StyledRectProps {
  rx: string;
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
