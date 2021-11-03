// "https://api.openweathermap.org/data/2.5/weather?q=London&appid=1ea2c468f0cee30b1e01b9e6a2258346"

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
        console.log(data.main.temp);
        console.log(data.weather[0].description);
        const kelvin = data.main.temp;
        // const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        // $('#main__weather-output').text(desc);
        showWeather(icon, kelvin)
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

    $("p").animate({
        bottom: '-=120'
    });


}

