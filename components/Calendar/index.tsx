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

const getStartDayOffset = (year: number, month: number): number => {
  const firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay(); // Retorna o índice do dia da semana (0 para domingo, 1 para segunda, etc.)
};

const Calendar: React.FC<ChildComponentProps> = ({ onValueChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: today.getTime(),
    endDate: today.getTime(),
  });
  const startDayOffset = getStartDayOffset(currentMonth.getFullYear(), currentMonth.getMonth());
  const getPreviousMonthDays = (year: number, month: number, count: number): Date[] => {
    const days: Date[] = [];
    const date = new Date(year, month, 0); // Último dia do mês anterior
    
    for (let i = count - 1; i >= 0; i--) {
      const previousDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
      days.push(previousDate);
    }
    return days;
  };
  
  const getNextMonthDays = (year: number, month: number, count: number): Date[] => {
    const days: Date[] = [];
    const date = new Date(year, month + 1, 1); // Primeiro dia do próximo mês
    
    for (let i = 0; i < count; i++) {
      const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
      days.push(nextDate);
    }
    return days;
  };

   // Get all the days in the current month
   const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
   
  // Calcule os dias do mês anterior e do próximo mês
  const previousMonthDays = getPreviousMonthDays(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    startDayOffset
  );

  const totalDays = previousMonthDays.length + daysInMonth.length;
  const nextMonthDaysCount = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  const nextMonthDays = getNextMonthDays(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    nextMonthDaysCount
  );

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


  return (
    <div className={styles.app}>
      <header className={styles.calendarHeader}>
        <button onClick={handlePreviousMonth}>{'<'}</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>{'>'}</button>
      </header>
  
      <div className={styles.calendarGrid}>
        <div className={styles.calendarDays}>
          {['d', 's', 't', 'q', 'q', 's', 's'].map((day) => (
            <div key={day} className={styles.calendarDay}>{day}</div>
          ))}
        </div>
  
        <div className={styles.calendarDates}>
          {/* Renderize os dias do mês anterior com opacidade */}
          {previousMonthDays.map((day) => (
            <div
              key={`prev-${day.toISOString()}`}
              className={`${styles.calendarDate} ${styles.faded}`}
            >
              {day.getDate()}
            </div>
          ))}
  
          {/* Renderize os dias do mês atual */}
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
  
          {/* Renderize os dias do próximo mês com opacidade */}
          {nextMonthDays.map((day) => (
            <div
              key={`next-${day.toISOString()}`}
              className={`${styles.calendarDate} ${styles.faded}`}
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