import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { SearchBar } from '@/components/weather/SearchBar';
import { CurrentWeather } from '@/components/weather/CurrentWeather';
import { Forecast } from '@/components/weather/Forecast';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import type { WeatherData, ForecastDay, HourlyForecast as HourlyForecastType, WeatherCondition } from '@/types/weather';
import { Cloud, CloudRain, Sun, Moon, CloudLightning, Wind } from 'lucide-react';

// Mock weather data generator
const generateMockWeather = (location: string): WeatherData => {
  const conditions: WeatherCondition[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy', 'clear-night'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = 15 + Math.random() * 15;
  
  return {
    location,
    country: 'rwanda',
    temperature: baseTemp,
    feelsLike: baseTemp + (Math.random() * 4 - 2),
    condition,
    humidity: 40 + Math.floor(Math.random() * 50),
    windSpeed: 5 + Math.floor(Math.random() * 25),
    windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
    pressure: 1000 + Math.floor(Math.random() * 30),
    visibility: 5 + Math.floor(Math.random() * 15),
    uvIndex: Math.floor(Math.random() * 11),
    dewPoint: Math.floor(baseTemp - 5),
    sunrise: '6:24 AM',
    sunset: '7:48 PM',
    updatedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
};

const generateMockForecast = (): ForecastDay[] => {
  const conditions: WeatherCondition[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    const baseTemp = 15 + Math.random() * 15;
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayName: days[date.getDay()],
      high: baseTemp + 5,
      low: baseTemp - 5,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      precipitation: Math.floor(Math.random() * 80),
      humidity: 40 + Math.floor(Math.random() * 50),
      windSpeed: 5 + Math.floor(Math.random() * 25),
    };
  });
};

const generateMockHourly = (): HourlyForecastType[] => {
  const conditions: WeatherCondition[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'clear-night'];
  const now = new Date();
  
  return Array.from({ length: 12 }, (_, i) => {
    const hour = new Date(now);
    hour.setHours(now.getHours() + i);
    const isNight = hour.getHours() < 6 || hour.getHours() > 20;
    
    return {
      time: hour.toLocaleTimeString('en-US', { hour: 'numeric' }),
      temperature: 15 + Math.random() * 15,
      condition: isNight ? 'clear-night' : conditions[Math.floor(Math.random() * conditions.length)],
      precipitation: Math.floor(Math.random() * 50),
    };
  });
};

// Background gradient based on weather condition
const getBackgroundClass = (condition?: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
    case 'partly-cloudy':
      return 'bg-sunny';
    case 'cloudy':
    case 'foggy':
      return 'bg-cloudy';
    case 'rainy':
      return 'bg-rainy';
    case 'stormy':
      return 'bg-stormy';
    case 'snowy':
      return 'bg-snowy';
    case 'clear-night':
      return 'bg-stormy';
    default:
      return 'bg-sunny';
  }
};

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourlyForecastType[]>([]);
  const [loading, setLoading] = useState(false);
  const [bgClass, setBgClass] = useState('bg-sunny');

  const fetchWeather = useCallback(async (location: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = generateMockWeather(location);
    setWeather(data);
    setForecast(generateMockForecast());
    setHourly(generateMockHourly());
    setBgClass(getBackgroundClass(data.condition));
    setLoading(false);
  }, []);

  const handleLocate = useCallback(() => {
    fetchWeather('Current Location');
  }, [fetchWeather]);

  // Initial load
  useEffect(() => {
    fetchWeather('San Francisco');
  }, [fetchWeather]);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${bgClass} grid-pattern`}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Weather Tracker</h1>
                <p className="text-xs text-muted-foreground">Project Nexus</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="flex-1 w-full md:w-auto flex justify-center">
              <SearchBar 
                onSearch={fetchWeather} 
                onLocate={handleLocate}
                isLoading={loading}
              />
            </div>
            
            {/* Quick Conditions */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={() => fetchWeather('London')} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="London">
                <CloudRain className="w-5 h-5 text-blue-400" />
              </button>
              <button onClick={() => fetchWeather('Tokyo')} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Tokyo">
                <Sun className="w-5 h-5 text-yellow-400" />
              </button>
              <button onClick={() => fetchWeather('Sydney')} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Sydney">
                <Moon className="w-5 h-5 text-indigo-400" />
              </button>
              <button onClick={() => fetchWeather('New York')} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="New York">
                <CloudLightning className="w-5 h-5 text-purple-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Current Weather */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather data={weather} />
              <HourlyForecast hours={hourly} />
            </div>
            
            {/* Right Column - Forecast */}
            <div className="lg:col-span-1">
              <Forecast days={forecast} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !weather && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <CloudRain className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Precipitation Alerts</h3>
            <p className="text-sm text-muted-foreground">Get notified before rain starts in your area</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <Sun className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">UV Index Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor UV levels to protect your skin</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
              <Wind className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Wind Forecast</h3>
            <p className="text-sm text-muted-foreground">Detailed wind speed and direction data</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Weather Tracker 
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Designed by ntwali pacific</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
