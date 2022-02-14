import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const JoinInButton = ({
  className,
  flat = true,
  children,
}: {
  className?: string;
  flat?: boolean;
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();

  return (
    <Button
      type="secondary"
      flat={flat}
      className={`${className} aq-mb-4`}
      forwardedAs="a"
      href={`${window.location.origin}/${
        i18n.language == "en" ? "" : `${i18n.language}/`
      }getting-started/`}
    >
      {children}
    </Button>
  );
};

export default styled(JoinInButton)`
  border-radius: 10px;
  font-size: 18px;
  font-weight: bolder;
  width: 100%;
  padding: 12px 0px;
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.md}) {
    padding: 18px 42px;
    width: unset;
  }
`;
