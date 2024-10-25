const customDate = "2024-10-25";
const dateToDisplay = dayjs(customDate).format("DD/MM/YYYY");
let dateElement = document.getElementById("publishDate");
console.log(dateElement);
console.log(dateToDisplay);
dateElement.innerHTML = "Date Published: " + dateToDisplay;
document.getElementById("currentDate").innerHTML = "Today's date: " + dayjs().format("DD/MM/YYYY");