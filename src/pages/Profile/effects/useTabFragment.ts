import { useEffect, useState } from "react";

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab") || "base";
  const currentTab = ["base", "advanced", "fiscal", "options"].includes(
    tabParam
  )
    ? tabParam
    : "base";

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
