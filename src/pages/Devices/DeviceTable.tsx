import { Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeDevicesQuery } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { getTableRows } from "src/pages/Devices/tableRows";

const DeviceTable = () => {
  const { t } = useTranslation();
  const { data, isFetching, error } = useGetUsersMeDevicesQuery();
  const dispatch = useAppDispatch();

  const noDevice = error && "status" in error && error.status === 404;
  const tableRows = data && !noDevice ? getTableRows(data, dispatch, t) : [];

  return (
    <>
      <Table
        dataSource={tableRows || []}
        isLoading={isFetching}
        isStriped={true}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "You don't have any devices yet. Add one to participate in the tests!"
          ),
        }}
        columns={[
          {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
            align: "center",
            role: "overline",
            hideIndex: true,
          },
          {
            title: t("Model"),
            dataIndex: "device",
            key: "device",
            role: "title",
            hideIndex: true,
          },
          {
            title: t("Operating System"),
            dataIndex: "os",
            key: "os",
          },
          {
            title: t("Version"),
            dataIndex: "os_version",
            key: "os_version",
          },
          {
            title: t("Actions"),
            dataIndex: "actions",
            key: "actions",
            align: "center",
            role: "cta",
            hideIndex: true,
          },
        ]}
      />
    </>
  );
};

export default DeviceTable;
