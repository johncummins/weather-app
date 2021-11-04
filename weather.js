// "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1ea2c468f0cee30b1e01b9e6a2258346"
const currentTime = Math.round(new Date().getTime()); // THis is in milliseconds

$(document).ready(function () {
    $('.main__search-box--form').on('submit', () => {
        // prevents default behaviour
        return false;
    });
    console.log("Document ready");
});

// on click event for the search button
$("#search-button").click(function () {
    getWeather();
});

// takes care of enter button
$('.main__search-box--form').keypress((e) => {
    // Enter key = number 13
    if (e.which === 13) {
        $('.main__search-box--form').submit();
        console.log('form submitted through enter key');
    }
})

function getWeather() {
    var city_name = $("#input-box").val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + config.api_key;
    console.log("This is the text:", city_name)
    $.get(url, function (data, status) {
        // alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.weather[0].description);
        const kelvin = data.main.temp;
        const sunrise = data.sys.sunrise * 1000; // change to milliseconds 
        const sunset = data.sys.sunset * 1000; // change to milliseconds 
        const timezone = data.sys.timezone * 1000; // change to milliseconds 
        // console.log("THis is the sunrise: ", sunrise);
        // const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        // $('#main__weather-output').text(desc);
        showWeather(icon, kelvin);
        getTimeTill(sunrise, sunset);
        getNightDay(sunrise, sunset, timezone);
    });
}

function showWeather(icon, kelvin) {

    // $('#main__weather-icon').attr("src", "icons/01d.png");
    $('#main__weather-results-icon').attr("src", "icons/" + icon + ".png");

    // temp calculations
    let celsius = kelvin - 273;
    celsius = +celsius.toFixed(2);
    console.log(celsius)
    $('#main__weather-results-text').text(celsius);
    // $(".main__weather-results-box").css({ top: 'auto' });
    $(".main__weather-results-box").animate({
        height: '200px',
        bottom: "0px",
    }, 300);
}

function getTimeTill(sunrise, sunset) {

    console.log("sunrise   : ", sunrise);
    console.log("Current: ", currentTime);
    let timeString = "";

    if (currentTime > sunrise) {
        // sunrise was in the past
        const timeDiffMilPast = currentTime - sunrise;
        timeDiffHourPast = convertDiffMillToHours(timeDiffMilPast);
        timeString = "Sunrise was " + timeDiffHourPast + " hours ago"
        console.log(timeString);
    }
    else {
        // sunrise is in the Future
        const timeDiffMilFut = sunset - currentTime;
        timeDiffHourFut = convertDiffMillToHours(timeDiffMilFut);
        timeString = "Sunset in " + timeDiffHourPast + " hours"
        console.log(timeString);

    }
    $("#main__time-results").text(timeString)

}

function convertDiffMillToHours(timeDiffMil) {
    var differenceDate = new Date(timeDiffMil);
    var diffHours = differenceDate.getUTCHours();
    // console.log("Time DIff: " + diffHours + "(in hours)");
    return diffHours;
}

function getNightDay(sunrise, sunset, timezone) {
    let adjustedTime;
    if (timezone !== NaN) {
        adjustedTime = currentTime;
    }
    else {
        adjustedTime = currentTime - timezone;
    }

    console.log(adjustedTime);
    console.log("TimeZ: ", timezone);
    console.log("Curr", currentTime);
    if (sunset < adjustedTime && adjustedTime > sunrise) {
        console.log("Its night time!");

        // $(".main__search-box--img").css({
        //     animation: 'decrease-brightness',
        // })
        // filter: brightness(0.6);

        $(".main__search-box--img").removeClass("main__search-box--img__day");
        $(".main__search-box--img").addClass("main__search-box--img__night");


    }
    else {
        console.log("Its day time!");
        $(".main__search-box--img").removeClass("main__search-box--img__night");
        $(".main__search-box--img").addClass("main__search-box--img__day");


    }

}

