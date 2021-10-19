import HttpError from "../HttpError";

// inferred type from really bad docs, please check
interface GeoDbCity {
  id: number;
  wikiDataId: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
}
interface GeoDbLinks {
  rel: string;
  href: string;
}
// inferred type from really bad docs, please check
interface GeoDbResult {
  data: GeoDbCity[];
  links: GeoDbLinks[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

export const cities = async ({
  countryIds,
  languageCode = "en",
}: {
  countryIds: string;
  languageCode: string;
}): Promise<GeoDbResult> => {
  const urlps = new URLSearchParams({
    countryIds: countryIds,
    languageCode: languageCode,
  });
  const params = "?" + urlps.toString();
  const response = await fetch(
    "https://wft-geo-db.p.rapidapi.com/v1/geo/cities" + params,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST || "",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_APIKEY || "",
      },
    }
  );
  const result = await response.json();
  if (!response.ok)
    throw new HttpError(response.status, response.statusText, result.message);
  return result;
};
