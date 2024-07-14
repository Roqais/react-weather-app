import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import clear from "../Assets/clear.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
import smoke from "../Assets/smoke.png";
import { useEffect, useState, useRef } from "react";







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



    const search = async (city) => {

        if (city === "") {
            alert("Enter City Name")
            return;
        }


        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();

            console.log(data)


            if (!response.ok) {
                alert(data.message)
                return;
            }


            const icon = allIcons[data.weather[0].icon || clear]

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data")
        }
    }

    useEffect(() => {
        search("London")
    })

    const handleClick = (e) => {
        e.preventDefault()
        search(inputRef.current.value)
    }




    return (
        <>
            <div className="min-h-screen grid grid-cols-5 md:bg-cover md:bg-center md:bg-[url('src/Assets/bg.jpg')] ">
                <div className="col-span-5">
                    <div className="max-w-md mx-auto min-h-screen md:min-h-0 md:my-14 md:py-20 pt-10  text-white md:px-10 px-8 bg-cyan-900 md:bg-cyan-900 md:bg-opacity-70 rounded-none md:rounded-3xl md:shadow-2xl border-none md:border-transparent">
                        <form>
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    ref={inputRef}
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search City, Islamabad..."
                                    required
                                />
                                <button
                                    type="submit"
                                    onClick={handleClick}
                                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {weatherData && (
                            <>
                                <img src={weatherData.icon} className="md:w-40 w-72 md:my-6 my-10 mx-auto" alt="Clear Weather" />
                                <div className="flex flex-col justify-center items-center md:mt-0 mt-16"> 
                                    <h1 className="text-8xl font-semibold">{weatherData.temp}°c</h1>
                                    <h1 className="text-5xl mt-4 font-light">{weatherData.location}</h1>
                                </div>
                                <div className="flex justify-between md:mt-14 mt-20">
                                    <div className="flex items-center space-x-4">
                                        <img src={humidity} className="md:w-10 md:h-12 w-12 h-14" alt="Humidity" />
                                        <div>
                                            <h3 className="md:text-lg text-2xl font-bold">{weatherData.humidity} %</h3>
                                            <h3 className="md:text-sm text-md   md:mt-0 mt-1 font-normal">Humidity</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <img src={wind} className="md:w-10 md:h-12 w-12 h-14" alt="Wind Speed" />
                                        <div>
                                            <h3 className="md:text-lg text-2xl font-extrabold">{weatherData.windSpeed} <span className="text-base">Km/h</span></h3>
                                            <h3 className="md:text-sm text-md  font-normal">Wind Speed</h3>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}


                    </div>

                </div>
            </div>

        </>


        // <>
        //     <div className="min-h-screen" style={{
        //         backgroundImage: image ? `url(${image})` : 'none',
        //         backgroundSize: 'cover', // or 'contain' based on your preference
        //         backgroundPosition: 'center',
        //         backgroundRepeat: 'no-repeat',
        //     }}
        //     >

        //         <div className="max-w-md mx-auto  bg-gray-700  p-10 rounded-lg text-white">
        //             <div className="flex flex-col justify-center">
        //                 <form>
        //                     <label
        //                         htmlFor="default-search"
        //                         className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        //                     >
        //                         Search
        //                     </label>
        //                     <div className="relative">
        //                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        //                             <svg
        //                                 className="w-4 h-4 text-gray-500 dark:text-gray-400"
        //                                 aria-hidden="true"
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 fill="none"
        //                                 viewBox="0 0 20 20"
        //                             >
        //                                 <path
        //                                     stroke="currentColor"
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     strokeWidth="2"
        //                                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        //                                 />
        //                             </svg>
        //                         </div>
        //                         <input
        //                             ref={inputRef}
        //                             type="search"
        //                             id="default-search"
        //                             className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                             placeholder="Search City, Islamabad..."
        //                             required
        //                         />
        //                         <button
        //                             type="submit"
        //                             onClick={handleClick}
        //                             className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        //                         >
        //                             Search
        //                         </button>
        //                     </div>
        //                 </form>
        //             </div>
        //             {weatherData && (
        //                 <>
        //                     <img src={weatherData.icon} className="w-40 my-10 mx-auto" alt="Clear Weather" />
        //                     <div className="flex flex-col justify-center items-center">
        //                         <h1 className="text-8xl">{weatherData.temp}°c</h1>
        //                         <h1 className="text-5xl mt-4">{weatherData.location}</h1>
        //                     </div>
        //                     <div className="flex justify-between mt-10">
        //                         <div className="flex items-center space-x-4">
        //                             <img src={humidity} className="w-10 h-12" alt="Humidity" />
        //                             <div>
        //                                 <h3 className="text-lg">{weatherData.humidity} %</h3>
        //                                 <h3 className="text-sm">Humidity</h3>
        //                             </div>
        //                         </div>
        //                         <div className="flex items-center space-x-4">
        //                             <img src={wind} className="w-10 h-12" alt="Wind Speed" />
        //                             <div>
        //                                 <h3 className="text-lg">{weatherData.windSpeed} Km/h</h3>
        //                                 <h3 className="text-sm">Wind Speed</h3>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </>
        //             )}
        //         </div>
        //     </div>
        // </>
    );
};

export default Weather;
