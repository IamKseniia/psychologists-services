import { useState, useRef, useEffect } from 'react';
import { useSorter } from '../../context/SorterContext';
import s from './SortControls.module.css';

const options = [
  { value: 'name-asc', label: 'A to Z' },
  { value: 'name-desc', label: 'Z to A' },
  { value: 'price-asc', label: 'Price ascending' },
  { value: 'price-desc', label: 'Price descending' },
  { value: 'rating-asc', label: 'Not popular' },
  { value: 'rating-desc', label: 'Popular' },
];

export default function SortControls() {
  const { sortKey, setSortKey } = useSorter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const toggle = () => setIsOpen(prev => !prev);
  const selectOption = val => {
    setSortKey(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === sortKey)?.label;

  return (
    <div className={s.wrapper} ref={ref}>
      <p className={s.title}>Filters</p>
      <button
        type="button"
        className={`${s.trigger} ${isOpen ? s.open : ''}`}
        onClick={toggle}
      >
        {selectedLabel || 'Select option'}
        <span className={s.arrow} aria-hidden="true">
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className={s.dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${s.option} ${
                option.value === sortKey ? s.active : ''
              }`}
              onClick={() => selectOption(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
