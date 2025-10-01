import { useState, useMemo, useRef, useEffect } from 'react';
import s from './MeetingTimeDropdown.module.css';

export default function MeetingTimeDropdown({ register, errors }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const dropdownRef = useRef(null);

  // Генерація тайм-слотів
  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    const step = 30; // хвилин

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        if (hour === endHour && minute > 0) break;
        const h = String(hour).padStart(2, '0');
        const m = String(minute).padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  }, []);

  const handleSelect = time => {
    setSelectedTime(time);
    setIsOpen(false);
  };

  // Закриття по кліку поза дропдауном
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <div className={s.control} onClick={() => setIsOpen(prev => !prev)}>
        {selectedTime || '00:00'}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.clockIcon}
        >
          <g clipPath="url(#clip0)">
            <path
              d="M10 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
              stroke="#191A15"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 5V10L13.3333 11.6667"
              stroke="#191A15"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {isOpen && (
        <ul className={s.menu}>
          Meeting time
          {timeSlots.map(time => (
            <li
              key={time}
              className={s.option}
              onClick={() => handleSelect(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      )}

      {/* прихований інпут для роботи з react-hook-form */}
      <input
        type="hidden"
        value={selectedTime}
        {...register('meetingTime', { required: 'Meeting time is required' })}
      />

      {errors.meetingTime && (
        <p className={s.error}>{errors.meetingTime.message}</p>
      )}
    </div>
  );
}
