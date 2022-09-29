import { Container, PageTitle } from "@appquality/appquality-design-system";
import React, { FC } from "react";

import GoogleTagManager from "./GoogleTagManager";
import LoggedOnly from "./LoggedOnly";
import NotLoggedOnly from "./NotLoggedOnly";
import TesterSidebar from "./TesterSidebar";

const ContentTemplate = ({
  title,
  heading,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Container className={className}>
      {title && (
        <PageTitle as="h2" size="regular" subtitle={subtitle} heading={heading}>
          {title}
        </PageTitle>
      )}
      {children}
    </Container>
  );
};

export const OutsideContainer: FC = ({ children }) => {
  return <>{children}</>;
};

export const PageTemplate: FC<{
  title?: string;
  subtitle?: string;
  heading?: string;
  shouldBeLoggedIn?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  containerClass?: string;
  showTitle?: boolean;
  route: string;
}> = ({
  children,
  title,
  subtitle,
  heading,
  shouldBeLoggedIn = false,
  showHeader = true,
  showSidebar = true,
  showTitle = true,
  containerClass = "aq-pb-3",
  route,
}) => {
  const LoggedStatusWrapper = shouldBeLoggedIn
    ? ({ children }: { children: React.ReactNode }) => (
        <LoggedOnly showHeader={showHeader}>{children}</LoggedOnly>
      )
    : NotLoggedOnly;

  // map children and separate Modal components from the rest
  const [modalChildren, pageChildren] = React.Children.toArray(children).reduce(
    (acc: React.ReactNode[], child) => {
      if (React.isValidElement(child) && child.type === OutsideContainer) {
        acc[0] = (
          <>
            {acc[0]}
            {child}
          </>
        );
      } else {
        acc[1] = (
          <>
            {acc[1]}
            {child}
          </>
        );
      }
      return acc;
    },
    [<></>, <></>] as React.ReactNode[]
  );

  const content = (
    <ContentTemplate
      className={containerClass}
      title={showTitle ? title : undefined}
      heading={heading}
      subtitle={subtitle}
    >
      {pageChildren}
    </ContentTemplate>
  );

  return (
    <GoogleTagManager
      title={
        title
          ? title
          : (route.charAt(0).toUpperCase() + route.slice(1)).replaceAll(
              "-",
              " "
            )
      }
    >
      <LoggedStatusWrapper>
        {modalChildren}
        {shouldBeLoggedIn && showSidebar ? (
          <TesterSidebar route={route}>{content}</TesterSidebar>
        ) : (
          content
        )}
      </LoggedStatusWrapper>
    </GoogleTagManager>
  );
};
