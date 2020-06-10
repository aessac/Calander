var newDate = new Date();
var day = newDate.getDay();
var date = newDate.getDate();
var month = newDate.getMonth();
var year = newDate.getFullYear();

var monthName = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
monthName = monthName[month];

var dayName = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
dayName = dayName[day];

var dateName = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
dateName = dateName[date];


//Hämta dagens nummer
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
var oneDay = 1000 * 60 * 60 * 24;
var today = Math.floor(diff / oneDay);
today = today - 1;


//API
$.ajax({
    type: "Get",
    url: "https://api.dryg.net/dagar/v2.1/2020?callback",
    dataType: "json",
    success: function (data) {
        dayArray = data.dagar;

        var nameDay = dayArray[today].namnsdag.join(', ').replace(/,/g, ' &');

        $(document).ready(function () {

            if (dayArray[today]["röd dag"] == "Nej") {
                $("#showDay").text(dayName);
            } else {
                $("#showDay").text(dayName).css("color", "red");
            };

            $("#showDayNumber").text(dateName);
            $("#showMonthName").text(monthName);
            $("#showYear").text(year);

            if (dayArray[today].namnsdag.length !== 0) {
                $("#showDayName").text(nameDay);
            };

            if (dayArray[today].flaggdag !== "") {
                $("#showFlaggdag").text(dayArray[today].flaggdag);
                $("#showFlaggdag").prepend('<img src="/Ajax/images/flag_sweden.png" />' + " ");
            }

            if (dayArray[today].helgdagsafton !== "") {
                $("#showHelgdag").text(dayArray[today].helgdagsafton);
            }
        });

    },
    error: function () {
        alert("json filen hittades inte...");
    }
});