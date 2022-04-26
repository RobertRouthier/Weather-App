function getWeather(city){
    var oneCall = 'https://api.openweathermap.org/data/2.5/onecall';
    var API_KEY = '4253ae682bded8fe54667e18d996e279';
    var weatherBase = 'https://api.openweathermap.org/data/2.5/weather';
    var city =
    fetch(weatherBase + `?q=${encodeURI(city)}&appid=${API_KEY}`)
    .then(weatherRes => weatherRes.json())
    .then(weatherData =>{
        console.log(weatherData)
        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;
        fetch(oneCall + `?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(oneCallRes =>oneCallRes.json())
        .then(oneCallData =>{
        var currentWeather = oneCallData.current.weather[0].main
        document.querySelector('#city-weather').textContent = currentWeather
        console.log(oneCallData)
        })
    })
}

document.querySelector('#search-btn').addEventListener('click', function(){
var inputCity = document.querySelector('#cityInput').value
getWeather(inputCity)
})

document.querySelector('.search').addEventListener('keyup', function(event){
    var inputCity = document.querySelector('#cityInput').value
    if (event.key == 'Enter'){
        getWeather(inputCity)
    }
})

function postWeather(oneCallData){

    var name = oneCallData
    var icon= oneCallData.weather
    var temp = oneCallData.main
    var wind = oneCallData.wind
    console.log(name, icon, temp, wind)

    doucment.querySelector('.city').innerHTML = "Weather in" + name
    doucment.querySelector('.icon').innerHTML = icon
    doucment.querySelector('.temp').innerHTML = temp + ' ℉'
    doucment.querySelector('.wind').innerHTML = 'Wind Speed' + wind + "mph"

    
}