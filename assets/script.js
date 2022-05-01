function getWeather(city){
    var oneCall = 'https://api.openweathermap.org/data/2.5/onecall';
    var API_KEY = '4253ae682bded8fe54667e18d996e279';
    var weatherBase = 'https://api.openweathermap.org/data/2.5/weather';
    var fiveDayBase = 'https://api.openweathermap.org/data/2.5/forecast'
    var city =
    fetch(weatherBase + `?q=${encodeURI(city)}&appid=${API_KEY}`)
    .then(weatherRes => weatherRes.json())
    .then(weatherData =>{
        console.log(weatherData)
        var lat = weatherData.coord.lat;
        var lon = weatherData.coord.lon;
        fetch(oneCall + `?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
        .then(oneCallRes =>oneCallRes.json())
        .then(oneCallData =>{
        var currentWeather = oneCallData.current.weather[0].main
        document.querySelector('.description').textContent = currentWeather
        console.log(oneCallData)
        oneCallData.name = weatherData.name;
        fetch(fiveDayBase + `?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
        .then(fiveDayRes => fiveDayRes.json())
        .then(fiveDayData =>{
            //var singleCard = document.querySelectorAll('single-card')
            for (var i = 0; i < 5; i++){
                var fiveIcon = fiveDayData.list[i].weather[0].icon
                document.querySelector('.five-icon').innerHTML = fiveIcon
            }
            for (var i = 0; i < 5; i++){
                var fiveTemp = fiveDayData.list[i].main.temp
                document.querySelector('.five-temp').innerHTML = fiveTemp + ' ℉'
            }
            for (var i = 0; i < 5; i++){
                var fiveWeather = fiveDayData.list[i].weather[0].main
                document.querySelector('.five-description').innerHTML = fiveWeather
            }
            for (var i = 0; i < 5; i++){
                var fiveHumid = fiveDayData.list[i].main.humidity
                document.querySelector('.five-humidity').innerHTML = fiveHumid + '%'
            }
            for (var i = 0; i < 5; i++){
                var fiveWind = fiveDayData.list[i].wind.speed
                document.querySelector('.five-wind').innerHTML = fiveWind + " mph"
            }
        
        console.log(fiveDayData)
        console.log(fiveIcon, fiveTemp, fiveWeather, fiveHumid, fiveWind)
    })
    postWeather(oneCallData)
    //postFiveDay(fiveDayData)
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
    
    var name = oneCallData.name
    var icon= oneCallData.current.weather[0].icon
    var temp = 'Temp ' + oneCallData.current.temp + ' ℉'
    var wind = oneCallData.current.wind_speed
    var humid = 'Humidity ' + oneCallData.current.humidity + '%'
    console.log(name, icon, temp, wind, humid)
    

    document.querySelector('.city').innerHTML = "Weather in " + name
    document.querySelector('.icon').innerHTML = icon
    document.querySelector('.temp').innerHTML = ' ' + temp 
    document.querySelector('.humidity').innerHTML =  humid
    document.querySelector('.wind').innerHTML = 'Wind Speed ' + wind + " mph"
    
    
}

function postFiveDay(fiveDayData){
    var name = oneCallData.name
    var icon= oneCallData.current.weather[0].icon
    var temp = 'Temp ' + oneCallData.current.temp + ' ℉'
    var wind = oneCallData.current.wind_speed
    var humid = 'Humidity ' + oneCallData.current.humidity + '%'

    document.querySelector('.five-icon').innerHTML = icon
    document.querySelector('.five-temp').innerHTML = ' ' + temp 
    document.querySelector('.humidity').innerHTML =  humid
    document.querySelector('.wind').innerHTML = 'Wind Speed ' + wind + " mph"
}

//figure out 5 day forecast
//figure out icon pull
//figure out background change by location
//style sidebar
//fogire out append to sidebar from local storage

