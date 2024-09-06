import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import clear from "../Assets/clear.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
import smoke from "../Assets/smoke.png";
import { useEffect, useState, useRef } from "react";

import bg from '../Assets/bg.jpg'
import Nav from "./Nav";

import temperature from '../Assets/sm/temperature.png'
import windImage from '../Assets/sm/windImage.png'
import humidityImage from '../Assets/sm/humidityImage.png'
import rainImage from '../Assets/sm/rainImage.png'
import sunriseImage from '../Assets/sm/sunriseImage.png'
import sunsetImage from '../Assets/sm/sunsetImage.png'







const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)




    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "010d": rain,
        "010n": rain,
        "013d": snow,
        "013n": snow,
        "50d": smoke,
        "50n": smoke,

    }

    const convertTo12HourFormat = (timestamp, timeZone) => {
        // Convert timestamp to milliseconds and adjust for time zone offset
        const date = new Date(timestamp * 1000 + timeZone * 1000);
      
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
      
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for 12AM
        minutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes
      
        return `${hours}:${minutes} ${period}`;
      };
      
      const TimeDisplay = (data, timeZone) => {
        const dataIn12HourFormat = convertTo12HourFormat(data, timeZone);
        return dataIn12HourFormat;
      };
      
      const search = async (city) => {
        if (city === "") {
          alert("Enter City Name");
          return;
        }
      
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
          const response = await fetch(url);
          const data = await response.json();

          if (!response.ok) {
            alert(data.message);
            return;
          }
      
          // Extract time zone offset from data (assuming it's provided in seconds)
          const timeZoneOffset = data.timezone || 0; // Handle potential missing data
      
          const sunrise = TimeDisplay(data.sys.sunrise, timeZoneOffset);
          const sunset = TimeDisplay(data.sys.sunset, timeZoneOffset);
      
          const icon = allIcons[data.weather[0].icon || clear];
      
          setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temp: parseFloat(data.main.temp).toFixed(1),
            feelsLike: parseFloat(data.main.feels_like).toFixed(1),
            location: data.name,
            icon: icon,
            sunrise: sunrise,
            sunset: sunset,
            rain: data.rain ? data.rain['1h'] : 0,
            desc: data.weather[0].description
          });
        } catch (error) {
          setWeatherData(false);
          console.error("Error in fetching data", error);
        }
      };
      
    useEffect(() => {
        search("Islamabad")
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        search(inputRef.current.value)
    }




    return (

        <>
            <div className="min-h-screen">

                <Nav />
                <div className="md:max-w-5xl md:mx-auto">

                    <div className="md:grid md:grid-cols-5 gap-10 md:mt-10 ">

                        <section className="col-span-2 md:py-0 py-20  border border-gray-300 flex flex-col  bg-gray-50 shadow-lg">
                            <div className="flex justify-center mt-8">
                                <h2 className="uppercase font-semibold text-3xl">{weatherData.desc}</h2>
                            </div>

                            <div className="flex justify-center">
                                <img src={weatherData.icon} className="h-56" alt="" />
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <h1 className="text-5xl font-bold">{weatherData.temp}°C</h1>

                                <h3 className="text-2xl font-light text-gray-500">{weatherData.location}</h3>
                            </div>
                        </section>

                        <section className="col-span-3 border p-4">
                            <form className="flex items-center justify-between md:gap-0 gap-4 md:my-0 my-4 ">

                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-4/5  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="City Name"
                                    ref={inputRef}
                                />

                                <button type="button"
                                    className="border border-gray-500 py-1.5 px-3 mr-2
                                 hover:bg-black hover:text-white rounded-lg"
                                    onClick={handleClick}>
                                    Search
                                </button>
                            </form>

                            <div className="grid grid-cols-2 gap-4 p-2 mt-3 items-center justify-center rounded bg-gray-100" >

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Feels Like</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.feelsLike}°C</h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={temperature} className="h-12" alt="clear" />
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Wind</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.windSpeed} <span className="text-sm font-light text-gray-500">m/s</span></h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={windImage} className="h-8 w-14" alt="clear" />
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Humidity</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.humidity} <span className="text-sm font-light text-gray-500">%</span></h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={humidityImage} className="h-8" alt="clear" />
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Rain</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.rain} <span className="text-sm font-light text-gray-500">mm</span></h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={rainImage} className="h-12" alt="clear" />
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Sunrise</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.sunrise} <span className="text-sm font-light text-gray-500">AM</span></h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={sunriseImage} className="h-20 w-12" alt="clear" />
                                    </div>
                                </div>

                                <div className="col-span-1 flex justify-between border h-24 rounded bg-white p-2">
                                    <div className="flex flex-col gap-2 justify-center">
                                        <h2 className="text-sm text-gray-400">Sunset</h2>

                                        <h1 className="text-2xl font-medium">{weatherData.sunset} <span className="text-sm font-light text-gray-500">PM</span></h1>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={sunsetImage} className="h-10" alt="clear" />
                                    </div>
                                </div>



                            </div>
                        </section>


                    </div>


                </div>



            </div>
        </>


    );
};

export default Weather;

