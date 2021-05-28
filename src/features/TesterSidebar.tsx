import React, { useState } from "react";
import { Sidebar } from "../stories/sidebar/Sidebar";
import i18next from "i18next";
import { BasicSidebarArgs } from "../stories/sidebar/Sidebar.stories.args";
import { useTranslation } from "react-i18next";

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

const TesterSidebar = ({ children }: TesterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
    // eslint-disable-next-line eqeqeq
    others: Array.from(
      i18next.languages.filter((l) => l != i18next.language),
      (lang) => {
        return { ...DefaultLanguage, lang: lang };
      }
    ),
  };

  BasicSidebarArgs.items = [
    {
      url: "#",
      icon: <HouseFill />,
      active: true,
      text: t("Dashboard"),
    },
    {
      url: "#",
      icon: <PersonFill />,
      active: false,
      text: t("Profile"),
      last: true,
    },
    {
      url: "#",
      icon: <Laptop />,
      active: false,
      text: t("Devices"),
    },
    {
      url: "#",
      icon: <Wallet2 />,
      active: false,
      text: t("Payments"),
    },
    {
      url: "#",
      icon: <StarFill />,
      active: false,
      text: t("Experience Points"),
    },
    {
      url: "#",
      icon: <GraphUp />,
      active: false,
      text: t("Leaderboard"),
    },
    {
      url: "#",
      icon: <BugFill />,
      active: false,
      text: t("Uploaded Bugs"),
    },
    {
      url: "#",
      icon: <Eyeglasses />,
      active: false,
      text: t("Courses"),
    },
    {
      url: "#",
      icon: <AwardFill />,
      active: false,
      text: t("Testing University"),
    },
    {
      url: "#",
      icon: <ChatDotsFill />,
      active: false,
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
