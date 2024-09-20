export function getMonth(timestamp: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date(timestamp);
  return months[date.getMonth()];
}

export function getTime(timestamp: string): string {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getUTCFullYear();

  return `${hours}:${formattedMinutes} ${ampm} ${day}-${month}-${year}`;
}

export function getDateFormatted(timestamp: string): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];
  return `${day} ${month.substring(0, 3)}`;
}

export function getDate(timestamp: string): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}