'use client';

import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.css';

// Helper function to get all the days in a month
const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  
  // Loop through each day of the month and push it to the 'days' array
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
};

// Interface for the selected date range
interface ChildComponentProps {
  onValueChange: (value: SelectedDates) => void;
}

// Interface for the selected start and end date
export interface SelectedDates {
  startDate: number | null;
  endDate: number | null;
}

const Calendar: React.FC<ChildComponentProps> = ({ onValueChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: today.getTime(),
    endDate: today.getTime(),
  });

  // Function to go to the next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Function to go to the previous month
  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleDayClick = (day: Date) => {
    // Do nothing if the day is not in the current month
    if (day.getMonth() !== currentMonth.getMonth()) return;

    if (!selectedDates.startDate) {
      // Set the start date if no start date is selected
      setSelectedDates({ startDate: day.getTime(), endDate: null });
    } else if (!selectedDates.endDate) {
      // Set the end date if no end date is selected
      const startDate = new Date(selectedDates.startDate);

      // If the selected day is before the start date, swap the dates
      if (day < startDate) {
        setSelectedDates({ startDate: day.getTime(), endDate: selectedDates.startDate });
      } else {
        setSelectedDates({ startDate: selectedDates.startDate, endDate: day.getTime() });
      }
    } else {
      // Reset the selection if both start and end dates are already selected
      setSelectedDates({ startDate: day.getTime(), endDate: null });
    }
  };

  // Check if a day is selected within the selected date range
  const isSelected = (day: Date) => {
    const dayTime = day.getTime();
    const { startDate, endDate } = selectedDates;

    // Check if the day is within the date range
    if (startDate && endDate) {
      return dayTime >= startDate && dayTime <= endDate;
    }

    return startDate === dayTime;
  };

  // Send the selected dates to the parent component
  const sendValueToParent = (dateValue: SelectedDates) => {
    onValueChange(dateValue);
  };

  // Use effect to send the selected date range to the parent whenever it changes
  useEffect(() => {
    sendValueToParent(selectedDates);
  }, [selectedDates]);

  // Get all the days in the current month
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  return (
    <div className={styles.app}>
      {/* Calendar header with navigation buttons */}
      <header className={styles.calendarHeader}>
        <button onClick={handlePreviousMonth}>{'<'}</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>{'>'}</button>
      </header>

      {/* Calendar grid displaying days of the week and dates */}
      <div className={styles.calendarGrid}>
        <div className={styles.calendarDays}>
          {['d', 's', 't', 'q', 'q', 's', 's'].map((day) => (
            <div key={day} className={styles.calendarDay}>{day}</div>
          ))}
        </div>

        <div className={styles.calendarDates}>
          {daysInMonth.map((day) => (
            <div
              key={day.toISOString()}
              className={`${styles.calendarDate} ${
                day.toDateString() === today.toDateString() ? styles.today : ''
              } ${isSelected(day) ? styles.selected : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;