export const dateOrTimeIsFuture = (
  bugFoundDate: Date,
  bugFoundTime: Date
): boolean => {
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB");
  const formattedBugDate = bugFoundDate.toLocaleDateString("en-GB");

  const curTime = parseInt(
    today.getHours() + "" + ("0" + today.getMinutes()).substr(-2) + ""
  );
  const bugTime = parseInt(
    bugFoundTime.getHours() +
      "" +
      ("0" + bugFoundTime.getMinutes()).substr(-2) +
      ""
  );

  return (
    bugFoundDate > today || //date is future
    (formattedBugDate === formattedToday && bugTime > curTime) //same date but time is future
  );
};
