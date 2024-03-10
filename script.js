async function getWeather(){
    const location = document.getElementById("locationInput").value;
    const apiKey = "41322a7716a53395d8de4aa6968e5db1";  
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    

    try{
        const response = await fetch(apiURL);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        displayWeather(data,location);
        
    }catch(error){
        console.error('Error fetching weather data:',error);
        document.getElementById("weatherInfo").innerText = "Error fetching weather data";
    }
}

function displayWeather(data,location){

    console.log("API response",data);

    //checking if main temp properties are present in the response or not
    if(data.main || data.main.temp || data.wind !== undefined){
        
        const {coord : {lat,lon}} = data;   //extracting the latitude and longitudes of the location from the data
        const temperatureInKelvin = data.main.temp;
        const temperatureInCelsius = temperatureInKelvin - 273.15; //converting the temp in kelvin into celsius
        const currentTime = new Date().toLocaleTimeString();
        const weatherInfo = `current temperature in ${location} is ${temperatureInCelsius}deg celsius on ${currentTime}.\nlatitude : ${lat}\nlongitude:${lon}.feel like temp : ${data.main.feels_like}, humidity : ${data.main.humidity}, pressure : ${data.main.pressure}, wind speed: ${data.wind.speed} , wind direction : ${data.wind.deg}.`;
        document.getElementById("weatherInfo").innerText = weatherInfo;
    }
}


document.getElementById("get_weather").addEventListener("click",getWeather);