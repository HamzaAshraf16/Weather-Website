"use strict";
//today
let todayName=document.getElementById("todayName");
let dateToday=document.getElementById("today-day-date");
let todayMonth=document.getElementById("todayMonth");
let location1=document.getElementById("location");
let todayDegree=document.getElementById("todayDegree");
let img=document.getElementById("img");
let rain=document.getElementById("rain");
let wind=document.getElementById("wind");
let windDirection=document.getElementById("windDirection");
let nextDay=document.getElementsByClassName("tomorrow-name");
let maxDegreeNext=document.getElementsByClassName("maxDegreeNext");
let minDegreeNext=document.getElementsByClassName("minDegreeNext");
let case2=document.getElementsByClassName("case2");
let img2=document.getElementsByClassName("img2");
let tomorrowName=document.getElementsByClassName("tomorrow-name");
let searchInput=document.getElementById("searchInput");

//fetch
async function getWeather(city){
   let weatherRes=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f2cec33841624c9d86874402240401&q=${city}&days=3`);
   let weatherData= await weatherRes.json();
   return weatherData;
}


//Display Today

function displayToday(data){
    let todayDate=new Date();

    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    dateToday.innerHTML=todayDate.getDate();
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-US", {month:"long"});
    location1.innerHTML=data.location.name;
    todayDegree.innerHTML=data.current.temp_c;
    img.setAttribute("src",data.current.condition.icon);
    case1.innerHTML=data.current.condition.text;
    rain.innerHTML=data.current.humidity;
    wind.innerHTML=data.current.wind_kph;
    windDirection.innerHTML=data.current.wind_dir;

}


function displayNext(data){
   
    for(let i =0; i<2;i++){
        let tomorrowNameDate=new Date(data.forecast.forecastday[i+1].date);
        tomorrowName[i].innerHTML=tomorrowNameDate.toLocaleDateString("en-US",{weekday:"long"});
        maxDegreeNext[i].innerHTML= data.forecast.forecastday[i+1].day.maxtemp_c;
        minDegreeNext[i].innerHTML= data.forecast.forecastday[i+1].day.mintemp_c;
        img2[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon);
        case2[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
    }

}



async function allFunctions(city="cairo"){
    let weatherData=await getWeather(city);

    if(!weatherData.error){
        displayToday(weatherData);
        displayNext(weatherData);
    }
    
}

allFunctions();


searchInput.addEventListener("input",function(){
    
    allFunctions(searchInput.value);
})