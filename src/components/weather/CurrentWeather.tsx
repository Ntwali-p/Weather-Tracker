import type { WeatherData } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Eye, Gauge, Sun, Navigation, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const conditionLabels: Record<string, string> = {
  'sunny': 'Sunny',
  'partly-cloudy': 'Partly Cloudy',
  'cloudy': 'Cloudy',
  'rainy': 'Rainy',
  'stormy': 'Stormy',
  'snowy': 'Snowy',
  'foggy': 'Foggy',
  'clear-night': 'Clear Night',
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 weather-card animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {data.location}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {data.country} • Updated {data.updatedAt}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sun className="w-4 h-4" />
          <span>UV Index: {data.uvIndex}</span>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
        <div className="flex items-center gap-4">
          <WeatherIcon condition={data.condition} size="xl" />
          <div>
            <div className="temp-display text-6xl md:text-7xl font-bold text-white">
              {Math.round(data.temperature)}°
            </div>
            <div className="text-lg text-muted-foreground capitalize">
              {conditionLabels[data.condition]}
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-muted-foreground">Feels Like</p>
                <p className="text-lg font-semibold text-white">{Math.round(data.feelsLike)}°</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-lg font-semibold text-white">{data.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Wind className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium text-white">{data.windSpeed} km/h</p>
            <p className="text-xs text-muted-foreground">{data.windDirection}</p>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Gauge className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-xs text-muted-foreground">Pressure</p>
            <p className="text-sm font-medium text-white">{data.pressure} hPa</p>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Eye className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="text-sm font-medium text-white">{data.visibility} km</p>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Navigation className="w-5 h-5 text-pink-400" />
          <div>
            <p className="text-xs text-muted-foreground">Dew Point</p>
            <p className="text-sm font-medium text-white">{data.dewPoint}°</p>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="mt-4 flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span>Sunrise: {data.sunrise}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 10V2M12 10a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
            <path d="M12 22c5.523 0 10-4.477 10-10" />
            <path d="M2 12h2M20 12h2" />
          </svg>
          <span>Sunset: {data.sunset}</span>
        </div>
      </div>
    </div>
  );
}
