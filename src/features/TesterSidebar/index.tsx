import { Sidebar, SidebarType } from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import menuStore from "../../redux/menu";
import useUser from "../../redux/user";

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
  GearWideConnected,
  Question,
} from "react-bootstrap-icons";

export interface TesterSidebarProps {
  route?: string;
  children?: React.ReactNode;
}

const TesterSidebarArgs: SidebarType.SidebarProps = {
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
        onClick: (lang: string, route: string) => {
          alert(`Switching to ${lang} and going to ${route}`);
        },
      },
      {
        lang: "es",
        onClick: (lang: string, route: string) => {
          alert(`Switching to ${lang} and going to ${route}`);
        },
      },
    ],
  },
  items: [],
};
const TesterSidebar = ({ route, children }: TesterSidebarProps) => {
  const { user } = useUser();
  const { isOpen, open, close } = menuStore();
  const isAdmin = user && user.isAdmin ? user.isAdmin : false;

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
          ? "/personal-equipment/"
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
      url: i18next.language === "en" ? `/faq/` : `/it/domande-frequenti/`,
      icon: <Question />,
      active: route === "faq",
      text: t("FAQ"),
    },
  ];

  if (isAdmin) {
    TesterSidebarArgs.items.push({
      url: "/wp-admin",
      icon: <GearWideConnected />,
      active: false,
      text: "Admin",
    });
  }

  TesterSidebarArgs.items[TesterSidebarArgs.items.length - 1].last = true;

  return (
    <Sidebar
      {...{
        ...TesterSidebarArgs,
        open: isOpen,
        route: route,
      }}
      onSidebarLeave={close}
      onSidebarEnter={open}
    >
      {children}
    </Sidebar>
  );
};
export default TesterSidebar;
