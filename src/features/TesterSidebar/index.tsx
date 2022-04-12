import {
  aqBootstrapTheme,
  Sidebar,
  SidebarType,
} from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useEffect } from "react";
import {
  AwardFill,
  BugFill,
  Eyeglasses,
  GearWideConnected,
  GraphUp,
  HouseFill,
  Laptop,
  PersonFill,
  Question,
  StarFill,
  Wallet2,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../hooks/useWindowSize";
import menuStore from "../../redux/menu";
import useUser from "../../redux/user";

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

const maxMobileSize = Number(
  aqBootstrapTheme.grid.breakpoints.md.replace(/\D/g, "")
);

const TesterSidebar = ({ route, children }: TesterSidebarProps) => {
  const { user } = useUser();
  const { isOpen, open, close } = menuStore();
  const isAdmin =
    user && user.role
      ? ["administrator", "tester_lead"].includes(user.role)
      : false;

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
      url: `${
        i18next.language === "en" ? "" : "/" + i18next.language
      }/my-dashboard/`,
      icon: <HouseFill />,
      active: route === "my-dashboard",
      text: t("Dashboard"),
    },
    {
      url: t("/my-account/"),
      icon: <PersonFill />,
      active: route === "my-account",
      text: t("Profile"),
    },
    {
      url: `${
        i18next.language === "en" ? "" : "/" + i18next.language
      }/personal-equipment/`,
      icon: <Laptop />,
      active: route === "personal-equipments",
      text: t("Devices"),
      last: true,
    },
    {
      url: `${
        i18next.language === "en" ? "" : "/" + i18next.language
      }/payments/`,
      icon: <Wallet2 />,
      active: route === "Payments",
      text: t("Payments"),
    },
    {
      url: `${
        i18next.language === "en" ? "" : "/" + i18next.language
      }/experience-points/`,
      icon: <StarFill />,
      active: route === "experience-points",
      text: t("Experience Points"),
    },
    {
      url: t("/leaderboard/"),
      icon: <GraphUp />,
      active: route === "leaderboard",
      text: t("Leaderboard"),
    },
    {
      url: `${
        i18next.language === "en" ? "" : "/" + i18next.language
      }/my-bugs/`,
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
      url: t("/testing-school/"),
      icon: <AwardFill />,
      active: route === "testing-school",
      text: t("Testing University"),
    },
    {
      url: t("/faq/"),
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

  const windowWidth = useWindowSize()[0];

  useEffect(() => {
    if (windowWidth > maxMobileSize) close();
  }, [windowWidth]);

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
