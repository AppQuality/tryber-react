function urlIsValid(url: string) {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.[a-z]{2,})(:\d{2,5})?(\/[^\s]*)?(\?.*)?$/;
  return urlRegex.test(url);
}

function domainIsAllowed(url: string) {
  const parsedURL = new URL(url);
  return (
    parsedURL.hostname === "dev.tryber.me" || parsedURL.hostname === "tryber.me"
  );
}

export const getRedirectTo = () => {
  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);
  const redirect = queryParams.get("redirectTo");
  if (redirect === null) return false;
  const redirectTo = decodeURI(redirect);
  if (urlIsValid(redirectTo) && domainIsAllowed(redirectTo)) {
    return redirectTo;
  }

  return false;
};
