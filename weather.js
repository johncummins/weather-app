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

    if (e.which === 13) {
        $('.main__search-box--form').submit();
        console.log('form submitted through enter key');
    }
})

function getWeather() {
    var city_name = $("#input-box").val();
    console.log("THis is the city name: ", city_name)

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
    $('#main__weather-results-text').append("&deg;C");
    // $('#main__weather-results-text').css("content:", "'\00b0 C' ");
    // $(".main__weather-results-box").css({ top: 'auto' });
    $(".main__weather-results-box").animate({
        height: '200px',
    }, 300);
}

function getNightDay(sunrise, sunset, timezone) {
    let adjustedTime;
    var isNightime;

    if (timezone !== NaN) {
        adjustedTime = currentTime;
    }
    else {
        adjustedTime = currentTime - timezone;
    }

    if (sunset < adjustedTime && adjustedTime > sunrise) {
        isNightime = true;

        console.log("Its night time!, nightime var = ", isNightime);

        $(".main__search-box--img").removeClass("main__search-box--img__day");
        $(".main__search-box--img").addClass("main__search-box--img__night");
    }
    else {
        isNightime = false;
        console.log("Its day time!, nightime var = ", isNightime);

        $(".main__search-box--img").removeClass("main__search-box--img__night");
        $(".main__search-box--img").addClass("main__search-box--img__day");
    }
    //Call the func to get sunrise and sunset
    getTimeTill(sunrise, sunset, isNightime);

}

function getTimeTill(sunrise, sunset, isNightime) {

    var timeString = "";

    // sunrise is in the Future
    const tDiffMilRiseFut = sunrise - currentTime;
    console.log("tDiffMilRiseFut", tDiffMilRiseFut)
    // sunrise was in the past
    const tDiffMilRisePast = currentTime - sunrise;
    console.log("tDiffMilRisePast", tDiffMilRisePast)
    // sunset is in the future
    const tDiffMilSetFut = sunset - currentTime;
    console.log("tDiffMilSetFut", tDiffMilSetFut)
    // sunset was in the past
    const tDiffMilSetPast = currentTime - sunset;
    console.log("tDiffMilSetFut", tDiffMilSetFut)

    if (isNightime === true) {
        // show sunrise
        console.log("sunrise is in... ")
        if (tDiffMilRiseFut < 0) {
            // display the past
            tDiffHourRisePast = convertDiffMillToHours(tDiffMilRisePast);
            timeString = "Sunrise was " + tDiffHourRisePast + " hours ago"

        }

        else {
            // display the future
            tDiffHourRiseFut = convertDiffMillToHours(tDiffMilRiseFut);
            timeString = "Sunrise in " + tDiffHourRiseFut + " hours"
        }
    }
    else {
        // show sunset
        console.log("sunset is in... ");
        if (tDiffMilSetFut < 0) {
            // display the past
            tDiffHourSetPast = convertDiffMillToHours(tDiffMilSetPast);
            timeString = "Sunset was " + tDiffHourSetPast + " hours ago"
        }

        else {
            // display the future
            tDiffHourSetFut = convertDiffMillToHours(tDiffMilSetFut);
            timeString = "Sunset in " + tDiffHourSetFut + " hours"
        }

    }

    $("#main__time-results").text(timeString)
}


function convertDiffMillToHours(timeDiffMil) {
    var differenceDate = new Date(timeDiffMil);
    var diffHours = differenceDate.getUTCHours();
    return diffHours;
}

