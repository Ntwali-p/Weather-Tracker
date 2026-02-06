import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onLocate: () => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, onLocate, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 h-11 search-input rounded-xl text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !query.trim()}
        className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Search'
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onLocate}
        disabled={isLoading}
        className="h-11 px-3 rounded-xl border-white/10 hover:bg-white/10 transition-colors"
      >
        <MapPin className="w-4 h-4" />
      </Button>
    </form>
  );
}
