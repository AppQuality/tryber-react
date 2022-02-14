import { Container, PageTitle } from "@appquality/appquality-design-system";
import React from "react";

import GoogleTagManager from "./GoogleTagManager";
import LoggedOnly from "./LoggedOnly";
import NotLoggedOnly from "./NotLoggedOnly";
import TesterSidebar from "./TesterSidebar";

const ContentTemplate = ({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <Container className="aq-pb-3">
      {title && (
        <PageTitle as="h2" size="regular" subtitle={subtitle}>
          {title}
        </PageTitle>
      )}
      {children}
    </Container>
  );
};

export const OutsideContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const PageTemplate = ({
  children,
  title,
  subtitle,
  shouldBeLoggedIn = false,
  showTitle = true,
  route,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  shouldBeLoggedIn?: boolean;
  showTitle?: boolean;
  route: string;
}) => {
  const LoggedStatusWrapper = shouldBeLoggedIn ? LoggedOnly : NotLoggedOnly;

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
    <ContentTemplate title={showTitle ? title : undefined} subtitle={subtitle}>
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
        {shouldBeLoggedIn ? (
          <TesterSidebar route={route}>{content}</TesterSidebar>
        ) : (
          content
        )}
      </LoggedStatusWrapper>
    </GoogleTagManager>
  );
};
