import type { HourlyForecast as HourlyForecastType } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hours: HourlyForecastType[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <div className="glass rounded-3xl p-6 weather-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-lg font-semibold text-white mb-4">Hourly Forecast</h3>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {hours.map((hour) => (
          <div 
            key={hour.time} 
            className="flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{hour.time}</span>
            <WeatherIcon condition={hour.condition} size="sm" />
            <span className="text-white font-semibold">{Math.round(hour.temperature)}°</span>
            <div className="flex items-center gap-1">
              <div 
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{ opacity: hour.precipitation > 0 ? 1 : 0.2 }}
              />
              <span className="text-xs text-muted-foreground">{hour.precipitation}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
