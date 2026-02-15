import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import styles from './AutoCompleteUI.module.css';
import Clear from '@assets/icons/cross.svg?react';
import Chevron from '@assets/icons/chevron-down.svg?react';
import { getCities } from '@api/cities';

interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  onCitySelect?: (city: string) => void;
  className?: string;
}

const AutoCompleteUI = ({
  label = 'Город',
  placeholder = 'Не указан',
  onCitySelect,
  className = '',
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCities = async () => {
    setIsLoading(true);
    try {
      const cities = await getCities();
      setAllCities(cities);
    } catch (error) {
      console.error('Ошибка загрузки городов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  loadCities();
  }, []);

  const normalizeString = (str: string): string => {
    return str.trim().toLowerCase();
  };

  const startsWithPrefix = (city: string, prefix: string): boolean => {
    const normalizedCity = normalizeString(city);
    const normalizedPrefix = normalizeString(prefix);
    return normalizedCity.startsWith(normalizedPrefix);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allCities.filter((city) => startsWithPrefix(city, value));
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const handleCitySelect = (city: string) => {
    setInputValue(city);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    if (onCitySelect) {
      onCitySelect(city);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleCitySelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();

    if (onCitySelect) {
      onCitySelect('');
    }
  };

  return (
    <div className={`${styles.cityAutocomplete} ${className}`}>
      <label className={styles.cityAutocompleteLabel}>{label}</label>
      <div className={`${styles.cityAutocompleteInputContainerFull} ${showSuggestions ? styles.isOpen : ""}`}>
        <div className={`${styles.cityAutocompleteInputContainer} `}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (inputValue.trim() !== '' && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={placeholder}
            className={styles.cityAutocompleteInput}
            aria-label={label}
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            aria-controls="city-suggestions"
            style={{
              paddingRight: inputValue ? '40px' : '16px',
            }}
          />

          {isLoading && (
            <div className={styles.cityAutocompleteLoading}>
              <div className={styles.cityAutocompleteSpinner}></div>
            </div>
          )}

          {isLoading ? null : (
            <button
              type="button"
              className={styles.cityAutocompleteClear}
              onClick={
                inputValue.trim() === ''
                  ? () => {
                      setSuggestions(allCities);
                      setShowSuggestions(true);
                      setSelectedIndex(-1);
                    }
                  : handleClearInput
              }
              aria-label={
                inputValue.trim() === ''
                  ? 'Показать предложения'
                  : 'Очистить поле'
              }
            >
              {inputValue.trim() === '' ? (
                <Chevron className={styles.clear} />
              ) : (
                <Clear className={styles.clear} />
              )}
            </button>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            id="city-suggestions"
            className={styles.cityAutocompleteSuggestions}
            role="listbox"
            aria-label="Предложения городов"
          >
            {suggestions.map((city, index) => (
              <div
                key={`${city}-${index}`}
                className={`${styles.cityAutocompleteSuggestion} ${
                  index === selectedIndex
                    ? styles.cityAutocompleteSuggestionSelected
                    : ''
                }`}
                onClick={() => handleCitySelect(city)}
                onMouseEnter={() => setSelectedIndex(index)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteUI;
