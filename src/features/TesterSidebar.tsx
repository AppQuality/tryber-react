import React, { useState } from "react";
import { Sidebar } from "../stories/sidebar/Sidebar";

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

const BasicSidebarArgs = {
  open: false,
  onLogout: () => {
    fetch("/wp-admin/admin-ajax.php?action=appq_wp_logout", {
      method: "GET",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        alert(e.message);
      });
  },
  languages: {
    current: { lang: "it" },
    others: [
      {
        lang: "en",
        onClick: (lang: string) => {
          alert(`Switching to ${lang}`);
        },
      },
      {
        lang: "es",
        onClick: (lang: string) => {
          alert(`Switching to ${lang}`);
        },
      },
    ],
  },
  items: [
    {
      url: "#",
      icon: <HouseFill />,
      active: true,
      text: "Dashboard",
    },
    {
      url: "#",
      icon: <PersonFill />,
      active: false,
      text: "Profile",
      last: true,
    },
    {
      url: "#",
      icon: <Laptop />,
      active: false,
      text: "Devices",
    },
    {
      url: "#",
      icon: <Wallet2 />,
      active: false,
      text: "Payments",
    },
    {
      url: "#",
      icon: <StarFill />,
      active: false,
      text: "Experience Points",
    },
    {
      url: "#",
      icon: <GraphUp />,
      active: false,
      text: "Leaderboard",
    },
    {
      url: "#",
      icon: <BugFill />,
      active: false,
      text: "Uploaded Bugs",
    },
    {
      url: "#",
      icon: <Eyeglasses />,
      active: false,
      text: "Courses",
    },
    {
      url: "#",
      icon: <AwardFill />,
      active: false,
      text: "Testing University",
    },
    {
      url: "#",
      icon: <ChatDotsFill />,
      active: false,
      text: "Feedback",
    },
  ],
};

const TesterSidebar = ({ children }: TesterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
