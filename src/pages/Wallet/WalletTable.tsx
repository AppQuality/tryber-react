import { Table, Pagination } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const WalletTable = () => {
  const { t } = useTranslation();

  return (
    <>
      <Table
        className="aq-mb-3"
        dataSource={[]}
        columns={[]}
        orderBy="date"
        order="ASC"
        isLoading={false}
        isStriped
      />
      <Pagination
        className="aq-pt-3"
        onPageChange={() => {}}
        current={1}
        maxPages={Math.ceil(/*totalBugs / limit*/ 2)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};
