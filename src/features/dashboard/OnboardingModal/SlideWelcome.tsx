import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      {t(
        "You are few steps away from making your experience memorable in the AppQuality Community World!"
      )}
    </>
  );
};
