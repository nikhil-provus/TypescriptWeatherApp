//import React, { useState } from 'react'
import type { CityProps } from '../../utils/types'
import isValidCity from '../../utils/isValidCity'
//import GetMoreWeatherDetails from './GetMoreWeatherDetails';
const InputFeild: React.FC<CityProps> = ({
  city,
  setCity,
  onSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onPastWeatherDetails,

}) => {

  const fetchWeather = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  }

  const fetchMoreWeatherDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPastWeatherDetails) {
      onPastWeatherDetails();
    }
  }

  // function changeUnit(e:React.FormEvent) {
  //   e.preventDefault();
  //   setUnit('f');
  //   GetMoreWeatherDetails;
  // }

  return (
    <form className='inputForm' onSubmit={(e) => e.preventDefault()}>
      <div className="inputGroup">
        <label>City Name:</label>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='inputBox'
          placeholder='e.g. Pune'
        />
        <button
          className='inputButton'
          disabled={!isValidCity(city)}
          onClick={fetchWeather}
        >
          FETCH CURRENT WEATHER
        </button>
      </div>

      <hr style={{ margin: '20px 0', opacity: 0.1 }} />
      <h3>Get past weather details from start date to end date</h3>
      <div className="dateGroup">
        <div className="dateInputWrapper">
          <label>Start Date:</label>
          <input
            type='string'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='inputBox'
          />
        </div>

        <div className="dateInputWrapper">
          <label>End Date:</label>
          <input
            type='string'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='inputBox'
          />
        </div>

        <button
          type='submit'
          className='inputButton historyButton'
          disabled={!isValidCity(city) || !startDate || !endDate}
          onClick={fetchMoreWeatherDetails}
        >
          Get Weather from {startDate} to {endDate}
        </button>
      </div>
    </form>
  )
}

export default InputFeild