import type { WeatherCondition } from '@/types/weather';
import type { ReactElement } from 'react';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-20 h-20',
  xl: 'w-32 h-32',
};

export function WeatherIcon({ condition, size = 'md', className = '' }: WeatherIconProps): ReactElement {
  const sizeClass = sizeMap[size];
  
  const icons: Record<WeatherCondition, ReactElement> = {
    'sunny': (
      <svg className={`${sizeClass} ${className} text-yellow-400 weather-icon-sun`} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="12" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="32" y1="4" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="60" />
          <line x1="4" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="60" y2="32" />
          <line x1="12.2" y1="12.2" x2="17.8" y2="17.8" />
          <line x1="46.2" y1="46.2" x2="51.8" y2="51.8" />
          <line x1="12.2" y1="51.8" x2="17.8" y2="46.2" />
          <line x1="46.2" y1="17.8" x2="51.8" y2="12.2" />
        </g>
      </svg>
    ),
    'partly-cloudy': (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 64 64" fill="none">
        <circle cx="24" cy="24" r="10" className="text-yellow-400" fill="currentColor" />
        <path 
          d="M44 48H28c-6.6 0-12-5.4-12-12 0-5.7 4-10.5 9.3-11.7.4-5.2 4.7-9.3 10-9.3 4.8 0 8.8 3.4 9.8 8 4.8.8 8.5 5 8.5 10 0 5.5-4.5 10-10 10z" 
          className="text-slate-300" 
          fill="currentColor"
        />
      </svg>
    ),
    'cloudy': (
      <svg className={`${sizeClass} ${className} text-slate-300 weather-icon-cloud`} viewBox="0 0 64 64" fill="none">
        <path 
          d="M48 44H20c-6.6 0-12-5.4-12-12 0-5.7 4-10.5 9.3-11.7.4-5.2 4.7-9.3 10-9.3 4.8 0 8.8 3.4 9.8 8 4.8.8 8.5 5 8.5 10 0 5.5-4.5 10-10 10z" 
          fill="currentColor"
        />
        <path 
          d="M52 32c0-4.4-3.1-8.1-7.2-9.1-.3-4.7-4.2-8.4-9-8.4-4.3 0-7.9 3.1-8.9 7.2-4.3.7-7.6 4.5-7.6 9.1 0 5 4 9 9 9h23.6c2.4 0 4.4-2 4.4-4.4 0-2-1.3-3.7-3.3-4.4z" 
          fill="currentColor" 
          opacity="0.6"
        />
      </svg>
    ),
    'rainy': (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 64 64" fill="none">
        <path 
          d="M44 36H28c-6.6 0-12-5.4-12-12 0-5.7 4-10.5 9.3-11.7.4-5.2 4.7-9.3 10-9.3 4.8 0 8.8 3.4 9.8 8 4.8.8 8.5 5 8.5 10 0 5.5-4.5 10-10 10z" 
          className="text-slate-400" 
          fill="currentColor"
        />
        <g className="text-blue-400">
          <line x1="24" y1="42" x2="22" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="42;44;42" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;52;50" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="32" y1="42" x2="30" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="42;44;42" dur="1s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;52;50" dur="1s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <line x1="40" y1="42" x2="38" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="42;44;42" dur="1s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;52;50" dur="1s" begin="0.6s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>
    ),
    'stormy': (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 64 64" fill="none">
        <path 
          d="M44 36H28c-6.6 0-12-5.4-12-12 0-5.7 4-10.5 9.3-11.7.4-5.2 4.7-9.3 10-9.3 4.8 0 8.8 3.4 9.8 8 4.8.8 8.5 5 8.5 10 0 5.5-4.5 10-10 10z" 
          className="text-slate-500" 
          fill="currentColor"
        />
        <path 
          d="M30 38L26 48h6l-2 10 10-12h-6l4-8H30z" 
          className="text-yellow-400 animate-pulse"
          fill="currentColor"
        />
      </svg>
    ),
    'snowy': (
      <svg className={`${sizeClass} ${className}`} viewBox="0 0 64 64" fill="none">
        <path 
          d="M44 36H28c-6.6 0-12-5.4-12-12 0-5.7 4-10.5 9.3-11.7.4-5.2 4.7-9.3 10-9.3 4.8 0 8.8 3.4 9.8 8 4.8.8 8.5 5 8.5 10 0 5.5-4.5 10-10 10z" 
          className="text-slate-300" 
          fill="currentColor"
        />
        <g className="text-white">
          <circle cx="24" cy="46" r="2" fill="currentColor">
            <animate attributeName="cy" values="44;52;44" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="32" cy="48" r="2" fill="currentColor">
            <animate attributeName="cy" values="46;54;46" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="46" r="2" fill="currentColor">
            <animate attributeName="cy" values="44;52;44" dur="2s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    ),
    'foggy': (
      <svg className={`${sizeClass} ${className} text-slate-400`} viewBox="0 0 64 64" fill="none">
        <path d="M12 24h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d="M16 32h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M20 40h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <path d="M24 48h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    'clear-night': (
      <svg className={`${sizeClass} ${className} text-indigo-300`} viewBox="0 0 64 64" fill="none">
        <path 
          d="M36 8c0 13.3-10.7 24-24 24 0 13.3 10.7 24 24 24s24-10.7 24-24S49.3 8 36 8z" 
          fill="currentColor"
        />
        <circle cx="48" cy="16" r="1.5" fill="white" opacity="0.8" />
        <circle cx="52" cy="24" r="1" fill="white" opacity="0.6" />
        <circle cx="44" cy="12" r="1" fill="white" opacity="0.5" />
      </svg>
    ),
  };

  return icons[condition] || icons['sunny'];
}
