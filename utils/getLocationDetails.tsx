// import React from 'react'
const API_KEY = weatherConfig.API_KEY;
const LOCATION_URL = weatherConfig.LOCATION_URL;
import { weatherConfig } from '../src/config/WeatherAppConfig';
import type { CityLocation } from './types';
export const getLocationDetails = async (cityName: string): Promise<CityLocation> => {

  const LocationUrl = `${LOCATION_URL}?q=${cityName}&limit=5&appid=${API_KEY}`;
  const locationDetails = await fetch(LocationUrl);
  const LatLon = await locationDetails.json();
  if (LatLon.length == 0) { throw new Error("Unable to find city, CHECK THE CITY NAME") }
  return LatLon[0];
}

export default getLocationDetails;