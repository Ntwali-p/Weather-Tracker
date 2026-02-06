import type { ForecastDay } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind } from 'lucide-react';

interface ForecastProps {
  days: ForecastDay[];
}

export function Forecast({ days }: ForecastProps) {
  return (
    <div className="glass rounded-3xl p-6 weather-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-lg font-semibold text-white mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {days.map((day) => (
          <div 
            key={day.date} 
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {/* Day */}
            <div className="w-20">
              <p className="text-white font-medium">{day.dayName}</p>
              <p className="text-xs text-muted-foreground">{day.date}</p>
            </div>
            
            {/* Icon & Condition */}
            <div className="flex items-center gap-3 flex-1 justify-center">
              <WeatherIcon condition={day.condition} size="sm" />
              <span className="text-sm text-muted-foreground hidden sm:block capitalize">
                {day.condition.replace('-', ' ')}
              </span>
            </div>
            
            {/* Precipitation & Wind */}
            <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-4">
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" />
                <span>{day.precipitation}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-cyan-400" />
                <span>{day.windSpeed} km/h</span>
              </div>
            </div>
            
            {/* Temps */}
            <div className="flex items-center gap-3 w-24 justify-end">
              <span className="text-white font-semibold">{Math.round(day.high)}°</span>
              <span className="text-muted-foreground">{Math.round(day.low)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
