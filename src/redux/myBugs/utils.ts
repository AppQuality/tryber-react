export const coloredStatus = (statusId: number | undefined) => {
  switch (statusId) {
    case 1:
      return "aq-text-danger";
    case 2:
      return "aq-text-success";
    case 3:
      return "aq-text-info";
    case 4:
      return "aq-text-warning";
    default:
      break;
  }
  return "";
};
