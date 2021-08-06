import { useEffect, useState } from "react";
import API from "../utils/api";
import lz from "lzutf8";
import { operations } from "../utils/schema";

export const usePopups = () => {
  const [popups, setPopups] = useState<
    operations["get-users-me-popups"]["responses"]["200"]["content"]["application/json"]
  >([]);

  useEffect(() => {
    API.myPopups({}).then(
      (
        data: operations["get-users-me-popups"]["responses"]["200"]["content"]["application/json"]
      ) => {
        const jsons = data
          .filter((p) => p.content)
          .map((p) => {
            if (!p.content) p.content = "{}";
            p.content = lz.decompress(lz.decodeBase64(p.content));
            return p;
          });
        setPopups(jsons);
      }
    );
  }, []);

  return {
    popups,
  };
};
