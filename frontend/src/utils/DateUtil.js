export function formatDate(inputDate) {
   const date = new Date(inputDate);
   const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
   ];

   const monthName = monthNames[date.getMonth()];
   const day = date.getDate();

   return `${day} ${monthName}`;
}
