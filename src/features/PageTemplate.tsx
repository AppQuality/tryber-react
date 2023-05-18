import { Container, PageTitle } from "@appquality/appquality-design-system";
import React, { FC, useEffect } from "react";

import GoogleTagManager from "./GoogleTagManager";
import LoggedOnly from "./LoggedOnly";
import NotLoggedOnly from "./NotLoggedOnly";
import TesterSidebar from "./TesterSidebar";
import { useParams } from "react-router-dom";
import { resetUserToken, setUserTokenPublic } from "src/redux/publicUserPages";
import { useAppDispatch } from "src/store";

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
  route: string;
}> = ({
  children,
  title,
  subtitle,
  heading,
  shouldBeLoggedIn = false,
  showHeader = true,
  showSidebar = true,
  containerClass = "aq-pb-3",
  route,
}) => {
  const dispatch = useAppDispatch();

  const LoggedStatusWrapper = shouldBeLoggedIn
    ? ({ children }: { children: React.ReactNode }) => (
        <LoggedOnly showHeader={showHeader}>{children}</LoggedOnly>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <NotLoggedOnly>{children}</NotLoggedOnly>
      );

  /**
   * In the /VDP page we set the user token to public in order to allow the user to submit a bug report.
   * Every other page should be private.
   */
  const { token } = useParams<{ token?: string }>();
  useEffect(() => {
    if (token) dispatch(setUserTokenPublic(token));
    else dispatch(resetUserToken());
  }, [token]);

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
      title={title}
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
