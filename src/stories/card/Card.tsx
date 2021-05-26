import { CardProps } from "./CardProps";
import { CardStyle } from "./CardStyle";
import { SmallTitle } from "../typography/Typography";

export const Card = ({ children, title }: CardProps) => {
  let cardHeader = null;
  if (title) {
    cardHeader = (
      <div className="aq-card-header">
        <SmallTitle className="aq-card-title">{title}</SmallTitle>
      </div>
    );
  }
  return (
    <CardStyle>
      {cardHeader}
      <div className="aq-card-body">{children}</div>
    </CardStyle>
  );
};
