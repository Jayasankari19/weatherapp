
import './App.css'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  

function App() {

  
  

      const [query,setQuery]=useState({q:'ahmedabad'})
      const [units,setUnits]=useState('metric')
      const [weather,setWeather]=useState(null)

    //  const getWeather=async ()=>{

    //     const message=query.q ? query.q : 'current location'
    //     toast.info(`Fetching weather data for ${message}`)
    //   await getFormattedWeatherData({...query,units}).then(data=>{
    //     setWeather(data)
    //   })
    //   console.log(data)
    //  }

    const getWeather = async () => {
      const message = query.q ? query.q : 'current location';
      toast.info(`Fetching weather data for ${message}`);
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        toast.success(`Successfully fetched weather data for ${message}`);
        console.log("Weather Data:", data);
      } catch (error) {
        toast.error(`Failed to fetch weather data for ${message}`);
        console.error("Error fetching weather data:", error);
      }
    };

     useEffect(() => { getWeather(); }, [query, units]);

    
     const formatBackground = () =>{
      if(!weather) return 'from-cyan-600 to-blue-700';
      const threshold = units === 'metric' ? 20 : 60;
      if(weather.temp <=threshold) return 'from-cyan-600 to-blue-700'
      return 'from-yellow-600 to-orange-700';
     };

    // const formatBackground = () => {
    //   if (!weather) return 'from-cyan-600 to-blue-700';
    //   const threshold = units === 'metric' ? 20 : 60;
    //   return weather.temp <= threshold ? 'from-cyan-600 to-blue-700' : 'from-yellow-600 to-orange-700';
    // };

  return (
    <>
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
    {/* <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400" > */}
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>

       {weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TempAndDetails weather={weather} units={units}/>
          <Forecast title='3 hour step forecast' data={weather.hourly} />
          <Forecast title='daily forecast' data={weather.daily} />
        </>
       )}
     
    </div>
    {/* <ToastContainer autoClose={2500} hideProgressBar={true}/> */}

    <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
