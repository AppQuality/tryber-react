import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      {t(
        "There are only a few steps left to make your CrowdTesting experience memorable!"
      )}
    </>
  );
};
