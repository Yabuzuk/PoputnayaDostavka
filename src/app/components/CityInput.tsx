import { MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cities } from '../../lib/cities';

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CityInput({ value, onChange, placeholder }: CityInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (val: string) => {
    onChange(val);
    
    if (val.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().startsWith(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (city: string) => {
    onChange(city);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <MapPin
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10"
        strokeWidth={1.5}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-100 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
