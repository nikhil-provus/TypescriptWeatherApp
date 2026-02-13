import React from "react";
import { useEffect, useState } from "react";
import type { InputForMoreDetails } from "../../utils/types";
import { weatherConfig } from "../config/WeatherAppConfig";
//import isValidCity from "../../utils/isValidCity";

const API_TIME_URL = weatherConfig.TIME_URL;

const GetMoreWeatherDetails: React.FC<InputForMoreDetails> = ({ lat, lon, startDate, endDate }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<string>('c');
    let celseus: boolean = true;

    useEffect(() => {
        const getMoreDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const separator = API_TIME_URL.includes('?') ? '&' : '?';
                const url = `${API_TIME_URL}${separator}latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;

                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error("Check Dates, No response from API");
                }

                const data = await res.json();
                setWeatherData(data);
            }
            catch (err: any) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        if (lat !== undefined && lon !== undefined && startDate && endDate) {
            getMoreDetails();
        }
    }, [lat, lon, startDate, endDate]);
    if (loading) {
        return <div className="weatherCard"><p>Loading historical data...</p></div>;
    }

    if (error) {
        return <div className="weatherCard"><p style={{ color: 'red' }}>Error: {error}</p></div>;
    }
    if (!weatherData || !weatherData.daily) {
        return null;
    }

    return (
        <>
            <>
                <button
                    type='submit'
                    className='inputButton historyButton'
                    disabled={!startDate || !endDate}
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
            <div className="history-list">
                {weatherData.daily.time.map((dateStr: string, index: number) => (

                    <>

                        <div key={dateStr} className="weatherCard">

                            <h4>{new Date(dateStr).toLocaleDateString('en-GB')}</h4>
                            {unit === 'c' ? (
                                <>
                                    <h1>{Math.round(weatherData.daily.temperature_2m_max[index])}°C</h1>
                                    <p>Min: {Math.round(weatherData.daily.temperature_2m_min[index])}°C</p>
                                </>
                            ) : (
                                <>
                                    <h1>{Math.round((weatherData.daily.temperature_2m_max[index] * 1.8) + 32)}°F</h1>
                                    <p>Min: {Math.round((weatherData.daily.temperature_2m_min[index] * 1.8) + 32)}°F</p>
                                </>
                            )}
                        </div>
                    </>
                ))}
            </div></>
    );
}

export default GetMoreWeatherDetails;