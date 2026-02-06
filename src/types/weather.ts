export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  dewPoint: number;
  sunrise: string;
  sunset: string;
  updatedAt: string;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export type WeatherCondition = 
  | 'sunny' 
  | 'partly-cloudy' 
  | 'cloudy' 
  | 'rainy' 
  | 'stormy' 
  | 'snowy' 
  | 'foggy' 
  | 'clear-night';

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  precipitation: number;
}
