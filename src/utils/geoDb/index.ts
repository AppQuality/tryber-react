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
export interface GeoDbRegion {
  countryCode: string;
  fipsCode?: string;
  isoCode: string;
  name: string;
  wikiDataId: string;
}
export interface GeoDbLinks {
  rel: string;
  href: string;
}
// inferred type from really bad docs, please check
export interface GeoDbResult<T> {
  data: T[];
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

interface RegionsRequestProps {
  countryId: string;
  languageCode?: string;
  offset?: number;
  limit?: number;
  search?: string;
}

export const cities = async ({
  countryIds,
  languageCode = "en",
  offset = 0,
  limit = 100,
  search,
}: CitiesRequestProps): Promise<GeoDbResult<GeoDbCity>> => {
  const urlps = new URLSearchParams({
    countryIds: countryIds.toString(),
    languageCode: languageCode,
    offset: offset.toString(),
    limit: limit.toString(),
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

export const adminAreas = async ({
  countryIds,
  languageCode = "en",
  offset = 0,
  limit = 100,
}: {
  countryIds: string;
  languageCode: string;
  offset?: number;
  limit?: number;
}): Promise<GeoDbResult<GeoDbCity>> => {
  const urlps = new URLSearchParams({
    countryIds: countryIds,
    languageCode: languageCode,
    offset: offset.toString(),
    limit: limit.toString(),
  });
  const params = "?" + urlps.toString();
  const response = await fetch(
    "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions" + params,
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

export const regions = async ({
  countryId,
  languageCode = "en",
  offset = 0,
  limit = 100,
  search,
}: RegionsRequestProps): Promise<GeoDbResult<GeoDbRegion>> => {
  const urlps = new URLSearchParams({
    countryIds: countryId.toString(),
    languageCode: languageCode,
    limit: limit.toString(),
    offset: offset.toString(),
    minPopulation: "100",
  });
  if (search) urlps.set("namePrefix", search);
  const params = "?" + urlps.toString();
  const response = await fetch(
    "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IT/regions" + params,
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
