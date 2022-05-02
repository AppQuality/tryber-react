// example of formattedUrl we receive from api
// https://secure.gravatar.com/avatar/45396ba87c1cf9397abba7f834b1d31c?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Fiacopo%2Bleardini%2F132&r=x
const getGravatarUrlWithColoredFallbackInitials = (
  formattedUrl: string,
  backgroundColor: string,
  textColor?: string
): string => {
  let [, hash, fallback] =
    formattedUrl.match(
      /^https:\/\/secure.gravatar.com\/avatar\/(.*)&d=(.*)$/
    ) || [];
  fallback = fallback.replace(/&r=x/, "");
  fallback = decodeURIComponent(fallback);
  fallback += `/${backgroundColor}/${textColor || "fff"}`;
  fallback = encodeURIComponent(fallback);
  return `https://eu.ui-avatars.com/api/${hash}/132?r=x&d=${fallback}`;
};

export default getGravatarUrlWithColoredFallbackInitials;
