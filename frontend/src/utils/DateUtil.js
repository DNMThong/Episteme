export function formatDate(inputDate) {
   const date = new Date(inputDate);
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

   const monthName = monthNames[date.getMonth()];
   const day = date.getDate();

   return `${monthName} ${day}`;
}
