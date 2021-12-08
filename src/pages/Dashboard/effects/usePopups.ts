import lz from "lzutf8";
import { useEffect, useState } from "react";
import API from "src/utils/api";
import { operations } from "src/utils/schema";

export const usePopups = ({
  showExpired = false,
}: {
  showExpired?: boolean;
}) => {
  const [popups, setPopups] = useState<
    operations["get-users-me-popups"]["responses"]["200"]["content"]["application/json"]
  >([]);

  useEffect(() => {
    API.myPopups({ showExpired })
      .then(
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
      )
      .catch((e) => {
        if (e.statusCode === 404) {
          setPopups([]);
        }
      });
  }, []);

  return {
    popups,
  };
};
