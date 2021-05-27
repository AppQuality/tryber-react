import { useState } from "react";
import { Row } from "../stories/table/_types";
import { Option } from "../stories/select/_types";

export const useMyBugs = () => {
  const [data, setData] = useState<Row[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [severities, setSeverities] = useState<Option[]>([]);
  const [status, setStatus] = useState<Option[]>([]);
  const [order, setOrder] = useState([]);
  const [orderBy, setOrderBy] = useState([]);
  const [page, setPage] = useState<number>(1);

  return {
    data: {
      current: data,
      set: setData,
    },
    campaigns: {
      current: campaigns,
      set: setCampaigns,
    },
    severities: {
      current: severities,
      set: setSeverities,
    },
    status: {
      current: status,
      set: setStatus,
    },
    page: {
      current: page,
      set: setPage,
    },
    order: {
      current: order,
      set: setOrder,
    },
    orderBy: {
      current: orderBy,
      set: setOrderBy,
    },
  };
};
