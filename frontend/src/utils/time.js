export const adjustTime = (date, hoursOffset) => {
  const adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() + hoursOffset);
  return adjustedDate;
};
