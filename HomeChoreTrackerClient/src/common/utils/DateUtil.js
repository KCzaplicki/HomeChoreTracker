export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateRange = (startDate, endDate) => {
  const startDateValue = new Date(startDate);
  const endDateValue = new Date(endDate);

  const startDay = startDateValue.getDate();
  const endDay = endDateValue.getDate();

  if (startDateValue.getMonth() === endDateValue.getMonth()) {
    const month = startDateValue.toLocaleString("en-US", { month: "short" });

    return `${startDay} - ${endDay} ${month}`;
  } else {
    const startMonth = startDateValue.toLocaleString("en-US", {
      month: "short",
    });
    const endMonth = endDateValue.toLocaleString("en-US", { month: "short" });

    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }
};
