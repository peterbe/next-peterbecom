export function formatDateBasic(date: string) {
  // Replace this with an actual date library
  const actualDate = new Date(date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[actualDate.getMonth()];
  return `${actualDate.getDate()} ${monthName} ${actualDate.getFullYear()}`;
}

export function postURL(oid: string) {
  return `/plog/${oid}`;
}

export function categoryURL(name: string) {
  return `/oc-${name.replace(" ", "+")}`;
}
