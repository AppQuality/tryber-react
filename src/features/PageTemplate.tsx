import { Container, PageTitle } from "@appquality/appquality-design-system";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoginPage } from "./LoginPage";

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
  heading,
  shouldBeLoggedIn = false,
  showTitle = true,
  containerClass = "aq-pb-3",
  route,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  heading?: string;
  shouldBeLoggedIn?: boolean;
  containerClass?: string;
  showTitle?: boolean;
  route: string;
}) => {
  const LoggedStatusWrapper = shouldBeLoggedIn ? LoggedOnly : NotLoggedOnly;
  const history = useHistory();
  const { user, loading } = useSelector(
    (state: GeneralState) => state.user,
    shallowEqual
  );

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
      {history.location.pathname !== "/" &&
      shouldBeLoggedIn &&
      !user?.id &&
      !loading &&
      (localStorage.getItem("isUserLogged") === "false" ||
        localStorage.getItem("isUserLogged") === null) ? (
        <LoginPage />
      ) : (
        <LoggedStatusWrapper>
          {modalChildren}
          {shouldBeLoggedIn ? (
            <TesterSidebar route={route}>{content}</TesterSidebar>
          ) : (
            content
          )}
        </LoggedStatusWrapper>
      )}
    </GoogleTagManager>
  );
};
