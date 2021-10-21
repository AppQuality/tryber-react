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
  offset = 0,
  limit = 100,
}: {
  countryIds: string;
  languageCode: string;
  offset?: number;
  limit?: number;
}): Promise<GeoDbResult> => {
  const urlps = new URLSearchParams({
    countryIds: countryIds,
    languageCode: languageCode,
    offset: offset.toString(),
    limit: limit.toString(),
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
}): Promise<GeoDbResult> => {
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
  countryIds,
  token,
  languageCode = "en",
}: {
  countryIds: string;
  token?: string;
  languageCode: string;
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const urlps = new URLSearchParams({
    languageCode: languageCode,
  });
  const params = "?" + urlps.toString();
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/countries/${countryIds}/region${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
