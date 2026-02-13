
export interface CityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  onPastWeatherDetails: () => void;

}

export interface CityLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface InputForMoreDetails {
  lat: number;
  lon: number;
  startDate: string;
  endDate: string;
}

export interface weatherSummary {
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  mainCondition: string;
}
export interface AppConfig {
  API_KEY: string;
  API_URL: string;
  LOCATION_URL: string;
  TIME_URL: string;
}