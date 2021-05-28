import React, { useState } from "react";
import { Sidebar } from "../stories/sidebar/Sidebar";
import i18next from "i18next";
import { BasicSidebarArgs } from "../stories/sidebar/Sidebar.stories.args";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  Laptop,
  HouseFill,
  PersonFill,
  Wallet2,
  StarFill,
  GraphUp,
  BugFill,
  Eyeglasses,
  AwardFill,
  ChatDotsFill,
} from "react-bootstrap-icons";

export interface TesterSidebarProps {
  route?: string;
  children?: React.ReactNode;
}

export const DefaultLanguage = {
  lang: "en",
  onClick: (lang: string) => {
    alert(`Switching to ${lang}`);
    //Controllare se esiste.
    i18next.changeLanguage(lang);
  },
};

const TesterSidebar = ({ route, children }: TesterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const languages = Object.keys(i18next.services.resourceStore.data);

  BasicSidebarArgs.onLogout = () => {
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

  BasicSidebarArgs.languages = {
    current: { lang: i18next.language },
    others: Array.from(
      languages.filter((l) => l !== i18next.language),
      (lang) => {
        return { ...DefaultLanguage, lang: lang };
      }
    ),
  };

  BasicSidebarArgs.items = [
    {
      url:
        i18next.language === "en"
          ? "/my-dashboard/"
          : `/${i18next.language}/la-mia-dashboard/`,
      icon: <HouseFill />,
      active: route === "MyDashboard",
      text: t("Dashboard"),
    },
    {
      url:
        i18next.language === "en"
          ? "/my-account/"
          : `/${i18next.language}/il-mio-account/`,
      icon: <PersonFill />,
      active: route === "MyAccount",
      text: t("Profile"),
      last: true,
    },
    {
      url:
        i18next.language === "en"
          ? "/personal-equipments/"
          : `/${i18next.language}/i-miei-device/`,
      icon: <Laptop />,
      active: route === "PersonalEquipments",
      text: t("Devices"),
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
      active: route === "ExperiencePoints",
      text: t("Experience Points"),
    },
    {
      url:
        i18next.language === "en"
          ? "/leaderboard/"
          : `/${i18next.language}/leaderboard-2/`,
      icon: <GraphUp />,
      active: route === "Leaderboard",
      text: t("Leaderboard"),
    },
    {
      url:
        i18next.language === "en"
          ? "/my-bugs/"
          : `/${i18next.language}/i-miei-bug/`,
      icon: <BugFill />,
      active: route === "MyBugs",
      text: t("Uploaded Bugs"),
    },
    {
      url:
        i18next.language === "en"
          ? "/courses/"
          : `/${i18next.language}/courses/`,
      icon: <Eyeglasses />,
      active: route === "Courses",
      text: t("Courses"),
    },
    {
      url:
        i18next.language === "en"
          ? "/testing-school/"
          : `/${i18next.language}/universita-del-test/`,
      icon: <AwardFill />,
      active: route === "TestingSchool",
      text: t("Testing University"),
    },
    {
      url:
        i18next.language === "en"
          ? "/feedback-hub/"
          : `/${i18next.language}/centro-dei-feedback/`,
      icon: <ChatDotsFill />,
      active: route === "FeedbackHub",
      text: t("Feedback"),
    },
  ];

  return (
    <Sidebar
      {...{ ...BasicSidebarArgs, open: isOpen }}
      onSidebarLeave={() => setIsOpen(false)}
      onSidebarEnter={() => setIsOpen(true)}
    >
      {children}
    </Sidebar>
  );
};
export default TesterSidebar;
