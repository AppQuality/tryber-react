import React, { useState } from "react";
import { Sidebar } from "../../stories/sidebar/Sidebar";
import i18next from "i18next";
import TesterSidebarArgs from "./args";
import { useTranslation } from "react-i18next";

import {
  AwardFill,
  BugFill,
  ChatDotsFill,
  Eyeglasses,
  GraphUp,
  HouseFill,
  Laptop,
  PersonFill,
  StarFill,
  Wallet2,
} from "react-bootstrap-icons";

export interface TesterSidebarProps {
  route?: string;
  children?: React.ReactNode;
  openFromHeader?: boolean;
}

const TesterSidebar = ({
  route,
  children,
  openFromHeader,
}: TesterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const languages = Object.keys(i18next.services.resourceStore.data);

  TesterSidebarArgs.onLogout = () => {
    fetch("/wp-admin/admin-ajax.php?action=appq_wp_logout", {
      method: "GET",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  TesterSidebarArgs.languages = {
    current: { lang: i18next.language },
    others: Array.from(
      languages.filter((l) => l !== i18next.language),
      (lang) => {
        return {
          lang: lang,
          onClick: (lang: string, route: string) => {
            window.location.href =
              lang === "en" ? `/${route}/` : `/${lang}/${route}/`;
          },
        };
      }
    ),
  };

  TesterSidebarArgs.items = [
    {
      url:
        i18next.language === "en"
          ? "/my-dashboard/"
          : `/${i18next.language}/la-mia-dashboard/`,
      icon: <HouseFill />,
      active: route === "my-dashboard",
      text: t("Dashboard"),
    },
    {
      url:
        i18next.language === "en"
          ? "/my-account/"
          : `/${i18next.language}/il-mio-account/`,
      icon: <PersonFill />,
      active: route === "my-account",
      text: t("Profile"),
    },
    {
      url:
        i18next.language === "en"
          ? "/personal-equipments/"
          : `/${i18next.language}/i-miei-device/`,
      icon: <Laptop />,
      active: route === "personal-equipments",
      text: t("Devices"),
      last: true,
    },
    {
      url:
        i18next.language === "en"
          ? "/payments/"
          : `/${i18next.language}/pagamenti/`,
      icon: <Wallet2 />,
      active: route === "Payments",
      text: t("Payments"),
    },
    {
      url:
        i18next.language === "en"
          ? "/experience-points/"
          : `/${i18next.language}/punti-esperienza/`,
      icon: <StarFill />,
      active: route === "experience-points",
      text: t("Experience Points"),
    },
    {
      url:
        i18next.language === "en"
          ? "/leaderboard/"
          : `/${i18next.language}/leaderboard-2/`,
      icon: <GraphUp />,
      active: route === "leaderboard",
      text: t("Leaderboard"),
    },
    {
      url:
        i18next.language === "en"
          ? "/my-bugs/"
          : `/${i18next.language}/i-miei-bug/`,
      icon: <BugFill />,
      active: route === "my-bugs",
      text: t("Uploaded Bugs"),
      last: true,
    },
    {
      url:
        i18next.language === "en"
          ? "/courses/"
          : `/${i18next.language}/courses/`,
      icon: <Eyeglasses />,
      active: route === "courses",
      text: t("Courses"),
    },
    {
      url:
        i18next.language === "en"
          ? "/testing-school/"
          : `/${i18next.language}/universita-del-test/`,
      icon: <AwardFill />,
      active: route === "testing-school",
      text: t("Testing University"),
    },
    {
      url:
        i18next.language === "en"
          ? "/feedback-hub/"
          : `/${i18next.language}/centro-dei-feedback/`,
      icon: <ChatDotsFill />,
      active: route === "feedback-hub",
      text: t("Feedback"),
      last: true,
    },
  ];

  return (
    <Sidebar
      {...{
        ...TesterSidebarArgs,
        open: isOpen || openFromHeader,
        route: route,
      }}
      onSidebarLeave={() => setIsOpen(false)}
      onSidebarEnter={() => setIsOpen(true)}
    >
      {children}
    </Sidebar>
  );
};
export default TesterSidebar;
