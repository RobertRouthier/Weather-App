var recent = document.getElementById("cityInput");

var recentValue = recent.value;

function getWeather(city) {
  var oneCall = "https://api.openweathermap.org/data/2.5/onecall";
  var API_KEY = "4253ae682bded8fe54667e18d996e279";
  var weatherBase = "https://api.openweathermap.org/data/2.5/weather";
  var fiveDayBase = "https://api.openweathermap.org/data/2.5/forecast";
  var city = fetch(weatherBase + `?q=${encodeURI(city)}&appid=${API_KEY}`)
    .then((weatherRes) => weatherRes.json())
    .then((weatherData) => {
      console.log(weatherData);
      var lat = weatherData.coord.lat;
      var lon = weatherData.coord.lon;
      fetch(oneCall + `?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
        .then((oneCallRes) => oneCallRes.json())
        .then((oneCallData) => {
          var currentWeather = oneCallData.current.weather[0].main;
          document.querySelector(".description").textContent = currentWeather;
          console.log(oneCallData);
          oneCallData.name = weatherData.name;
          fetch(
            fiveDayBase +
              `?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
          )
            .then((fiveDayRes) => fiveDayRes.json())
            .then((fiveDayData) => {
              var singleCard = document.querySelectorAll(".single-card");
              var allIcon = document.querySelectorAll(".five-icon");
              var allTemp = document.querySelectorAll(".five-temp");
              var allWeather = document.querySelectorAll(".five-description");
              var allHumid = document.querySelectorAll(".five-humidity");
              var allWind = document.querySelectorAll(".five-wind");

              for (i = 0; i < allIcon.length; i++) {
                console.log(allIcon.length);
                var fiveIcon = fiveDayData.list[i].weather[0].icon;
                allIcon[i].src =
                  "http://openweathermap.org/img/wn/" + fiveIcon + "@2x.png";
              }
              console.log(fiveIcon);
              for (var i = 0; i < allTemp.length; i++) {
                var fiveTemp = fiveDayData.list[i].main.temp;
                allTemp[i].innerHTML = fiveTemp + " ???";
              }
              for (var i = 0; i < allWeather.length; i++) {
                var fiveWeather = fiveDayData.list[i].weather[0].main;
                allWeather[i].innerHTML = fiveWeather;
              }
              for (var i = 0; i < allHumid.length; i++) {
                var fiveHumid = fiveDayData.list[i].main.humidity;
                allHumid[i].innerHTML = fiveHumid + "%";
              }
              for (var i = 0; i < allWind.length; i++) {
                var fiveWind = fiveDayData.list[i].wind.speed;
                allWind[i].innerHTML = fiveWind + " mph";
              }

              console.log(fiveDayData);
              console.log(fiveIcon, fiveTemp, fiveWeather, fiveHumid, fiveWind);
            });
          postWeather(oneCallData);
          saveSearch(recent);
          postSearch();
          //postFiveDay(fiveDayData)
        });
    });
}

document.querySelector("#search-btn").addEventListener("click", function () {
  var inputCity = document.querySelector("#cityInput").value;
  getWeather(inputCity);
});

document.querySelector(".search").addEventListener("keyup", function (event) {
  var inputCity = document.querySelector("#cityInput").value;
  if (event.key == "Enter") {
    getWeather(inputCity);
  }
});

function postWeather(oneCallData) {
  var name = oneCallData.name;
  var icon = oneCallData.current.weather[0].icon;
  var temp = "Temp " + oneCallData.current.temp + " ???";
  var wind = oneCallData.current.wind_speed;
  var humid = "Humidity " + oneCallData.current.humidity + "%";
  console.log(name, icon, temp, wind, humid);

  document.querySelector(".city").innerHTML = "Weather in " + name;
  document.querySelector(".icon").src =
    "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector(".temp").innerHTML = " " + temp;
  document.querySelector(".humidity").innerHTML = humid;
  document.querySelector(".wind").innerHTML = "Wind Speed " + wind + " mph";
}

function postFiveDay(fiveDayData) {
  var name = oneCallData.name;
  var icon = oneCallData.current.weather[0].icon;
  var temp = "Temp " + oneCallData.current.temp + " ???";
  var wind = oneCallData.current.wind_speed;
  var humid = "Humidity " + oneCallData.current.humidity + "%";

  document.querySelector(".five-icon").innerHTML = icon;
  document.querySelector(".five-temp").innerHTML = " " + temp;
  document.querySelector(".humidity").innerHTML = humid;
  document.querySelector(".wind").innerHTML = "Wind Speed " + wind + " mph";
}

var recentTrim = recent.value.trim();
var recentlist = document.querySelector(".recent");
var arr = JSON.parse(localStorage.getItem("recentSearch")) || [];;

function saveSearch() {
  var recentTrim = recent.value.trim();

  if (recentTrim !== "") {
    var recentSearch = window.localStorage.getItem("recentSearch") || [];

    arr.push(recentTrim);
    window.localStorage.setItem("recentSearch", JSON.stringify(arr));
    //window.location.href = "index.html";
  }
}
document.onclick= function(event){
    var target = event.target
    console.log('heeeeey', target.getAttribute('data-city'))
    var value = target.getAttribute('data-city')
    if(value){

        getWeather(value)
    }

  }

function addValues(value) {
  var list = document.createElement("button");
  list.textContent = value;
  list.setAttribute('data-city', value) 
  
    
  
  list.className = "cities";

  var recentList = document.querySelector(".recent");

  recentList.appendChild(list);
}

function postSearch() {
   document.querySelector('.recent').innerHTML = ""
  if (recent.value) {
    addValues(recent.value);
    return;
  }
  var recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || [];
  console.log("helloooo", recentSearch);
  for (var i = 0; i < recentSearch.length; i++) {
    var item = recentSearch[i];
    addValues(item);
  }
}
postSearch();
//figure out background change by location
//style sidebar
//fogire out append to sidebar from local storage
