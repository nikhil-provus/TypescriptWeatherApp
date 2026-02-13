import { useState } from 'react';
import GetWeatherDetailsUsingCity from './GetWeatherDetailsUsingCity';
import InputFeild from './InputFeild';
import GetMoreWeatherDetails from './GetMoreWeatherDetails';
import getLocationDetails from '../../utils/getLocationDetails';

export const HomePage = () => {
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [latLon, setlatLon] = useState<{ lat: number; lon: number } | null>(null);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateLocation = async () => {
    if (!city.trim()) return null;
    setLoading(true);
    setError(null);
    try {
      const data = await getLocationDetails(city);
      setlatLon({ lat: data.lat, lon: data.lon });
      return data;
    } catch (err: any) {
      setError(err.message);
      setlatLon(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentSearch = async () => {
    const success = await updateLocation();
    if (success) setIsHistoryMode(false);
  };

  const handleHistorySearch = async () => {
    const success = await updateLocation();
    if (success) setIsHistoryMode(true);
  };

  return (
    <div className='front-page'>
      <InputFeild
        city={city}
        setCity={setCity}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSearch={handleCurrentSearch}
        onPastWeatherDetails={handleHistorySearch}
      />

      {loading && <p className="status-msg">Locating city...</p>}
      {error && <p className="status-msg error">{error}</p>}

      <div className="weather-display-container">
        {latLon && !loading && (
          !isHistoryMode ? (
            <GetWeatherDetailsUsingCity cityName={city} />
          ) : (
            <GetMoreWeatherDetails
              lat={latLon.lat}
              lon={latLon.lon}
              startDate={startDate}
              endDate={endDate}
            />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
