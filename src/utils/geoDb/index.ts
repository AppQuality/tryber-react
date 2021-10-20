import HttpError from "../HttpError";

// inferred type from really bad docs, please check
export interface GeoDbCity {
  id: number;
  wikiDataId: string;
  type: "ADM2" | "CITY" | string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  population: number;
}
export interface GeoDbLinks {
  rel: string;
  href: string;
}
// inferred type from really bad docs, please check
export interface GeoDbResult {
  data: GeoDbCity[];
  links?: GeoDbLinks[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

interface CitiesRequestProps {
  countryIds: string[];
  languageCode?: string;
  offset?: number;
  limit?: number;
  search?: string;
}

export const cities = async ({
  countryIds,
  languageCode = "en",
  offset = 0,
  limit = 10,
  search,
}: CitiesRequestProps): Promise<GeoDbResult> => {
  const urlps = new URLSearchParams({
    countryIds: countryIds.toString(),
    languageCode: languageCode,
    limit: limit.toString(),
    offset: offset.toString(),
    minPopulation: "100",
  });
  if (search) urlps.set("namePrefix", search);
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
