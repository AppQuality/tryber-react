import { useEffect, useState } from "react";

const useTabFragment = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab") || "history";
  const currentTab = ["history", "expired"].includes(tabParam)
    ? tabParam
    : "history";

  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("tab", activeTab);
    window.history.pushState(
      {},
      "",
      window.location.origin +
        window.location.pathname +
        "?" +
        currentParams.toString()
    );
  }, [activeTab]);

  return { activeTab, setActiveTab };
};

export default useTabFragment;
