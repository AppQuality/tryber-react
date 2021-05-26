import { CardProps } from "./CardProps";
import { CardStyle } from "./CardStyle";

export const Card = ({ children }: CardProps) => {
  return (
    <CardStyle>
      <div className="aq-card-body">{children}</div>
    </CardStyle>
  );
};
