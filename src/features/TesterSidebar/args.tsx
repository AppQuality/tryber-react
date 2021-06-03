import { HouseFill, PersonFill, Laptop } from "react-bootstrap-icons";

const TesterSidebarArgs = {
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
export default TesterSidebarArgs;
