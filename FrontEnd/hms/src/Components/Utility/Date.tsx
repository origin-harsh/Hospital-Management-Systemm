const formatDate = (dateString: any) => {
  if(!dateString) return undefined;  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];  
  const date = new Date(dateString);

  const day = date.getDate();
  const year = date.getFullYear();

  

  const month = months[date.getMonth()];

  return `${day} ${month} ${year}`;
}

const formatDateTime = (dateString: any) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dayName = days[date.getDay()]; // Mon, Tue
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();

  // AM PM logic
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 -> 12

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${dayName}, ${day} ${month} ${year} • ${hours}:${formattedMinutes} ${ampm}`;
};

export { formatDateTime, formatDate };

