import React, { useEffect, useState } from 'react';
import getLocationDetails from '../../utils/getLocationDetails';
import { weatherConfig } from '../config/WeatherAppConfig';

const API_URL = weatherConfig.API_URL;
const API_KEY = weatherConfig.API_KEY;

const GetWeatherDetailsUsingCity: React.FC<{ cityName: string }> = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState<string>('c');
  let celseus: boolean = true;

  useEffect(() => {
    if (!cityName) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError("");
        const coords = await getLocationDetails(cityName);
        const weatherUrl = `${API_URL}?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`;
        const res = await fetch(weatherUrl);
        if (!res.ok) { throw new Error("Failed to fetch API check internet connection") }
        const data = await res.json();

        setWeatherData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [cityName]); 

  if (loading) return <p>Loading the data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!weatherData) return <p className='cityNotEnteredPara'>you have not entered the city.</p>;

  return (<>
    <>
      <button
        type='submit'
        className='inputButton historyButton'
        disabled={!cityName}
        onClick={() => {
          if (celseus) {
            setUnit('f');
            celseus = false;
          } else {
            setUnit('c');
            celseus = true
          }

        }}
      >Change Unit
      </button><br />
    </>
    <div className="weatherCard">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      {unit === 'c' ? (
        <h1>{Math.round(weatherData.main.temp)}°C</h1>
      ) : (
        <h1>{Math.round((weatherData.main.temp) * 1.8 + 32)}°C</h1>
      )}
      <p>{weatherData.weather[0].description}</p>
    </div>
  </>
  );
};

export default GetWeatherDetailsUsingCity;