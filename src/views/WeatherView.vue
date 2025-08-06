<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
      </div>
    </div>
    
    <!--The <main> tag in HTML is used to specify the main content of a document 
    More info about main, check https://www.w3schools.com/tags/tag_main.asp-->  
    <main>
      <!--If there are no data returned, then skip rendering the information-->  
      <div v-if="weatherData">
        <!--Display the weather data attribute returned from API
        Example of API data: https://openweathermap.org/current-->  
        <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <!--The image source of of the weather icon will be coming from a function called iconUrl
              which will be shared in script later-->  
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <!-- weather[0] means the current weather, the way we need to obtain data depends on how
        the API JSON data looks-->
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
// The info section in 10.1.1 provided detailed information about this package 
import axios from "axios";

const apikey = "af3215b2379e88e0cb5b86e6fc9e7b48";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  //computed is a property that is used to define a property that 
  //is dependent on other data properties. 
  //If we using a more easy to understand words to understand the concept: 
  //the derived value such as temperature automatically update when the relevant value change.
  computed: {
    //There are multiple way to obtain the data in Celsius format.
    //Calculation by yourself like below after data is retireved or via API parameters
    
    //Example of adding additional units requirement, if you choose this, remember to change section 3.1
    //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    //Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  //There are two steps involved in this, 
  //step 1: identify current location 
  //step 2: after identify, get the weather data straight based on the current location.
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    //Async in a easy to understand way means the method will run in backend thread, 
    //And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      //The navigator.geolocation object is part of the Web API provided by modern web browsers
      //Please note this function is not belongs to Vue or openweather.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          //API link to obtain the current weather based on the current location browser identified 
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        //Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },

    async searchByCity() {
      if (!this.city.trim()) {
        console.log('Please enter a city name');
        return;
      }
      
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      } catch (error) {
        console.error("Error searching weather by city:", error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.search-input {
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  width: 300px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4CAF50;
}

.search-button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #45a049;
}

/* 天气信息居中样式 */
main {
  text-align: center;
  margin-top: 30px;
}

main h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

main div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

main img {
  width: 80px;
  height: 80px;
}

main p {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

main span {
  font-size: 18px;
  color: #666;
  text-transform: capitalize;
}
</style>
