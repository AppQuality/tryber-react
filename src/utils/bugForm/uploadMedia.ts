import HttpError from "../HttpError";

export const uploadMedia = async (
  files: File[],
  token?: string
): Promise<
  ApiOperations["post-media"]["responses"]["200"]["content"]["application/json"]
> => {
  const formData = new FormData();
  files.forEach((f) => formData.append("media", f));
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
    method: "POST",
    headers: requestHeaders,
    body: formData,
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
