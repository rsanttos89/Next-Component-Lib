'use client';

import React, { useState } from 'react';
import styles from './Calendar.module.css';

interface SelectedDates {
  startDate: number | null;
  endDate: number | null;
}

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: null,
    endDate: null,
  });

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleDayClick = (day: Date) => {
    if (day.getMonth() !== currentMonth.getMonth()) return;

    if (!selectedDates.startDate) {
      setSelectedDates({ startDate: day.getTime(), endDate: null });
    } else if (!selectedDates.endDate) {
      const startDate = new Date(selectedDates.startDate);

      if (day < startDate) {
        setSelectedDates({ startDate: day.getTime(), endDate: selectedDates.startDate });
      } else {
        setSelectedDates({ startDate: selectedDates.startDate, endDate: day.getTime() });
      }
    } else {
      setSelectedDates({ startDate: day.getTime(), endDate: null });
    }
  };

  const isSelected = (day: Date) => {
    const dayTime = day.getTime();
    const { startDate, endDate } = selectedDates;

    if (startDate && endDate) {
      return dayTime >= startDate && dayTime <= endDate;
    }

    return startDate === dayTime;
  };

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  return (
    <div className={styles.app}>
      <header className={styles.calendarHeader}>
        <button onClick={handlePreviousMonth}>{'<'}</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>{'>'}</button>
      </header>

      <div className={styles.calendarGrid}>
        <div className={styles.calendarDays}>
          {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((day) => (
            <div key={day} className={styles.calendarDay}>
              {day}
            </div>
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

      <footer className={styles.footer}>
        <p>Start Date: {selectedDates.startDate ? new Date(selectedDates.startDate).toLocaleDateString() : 'None'}</p>
        <p>End Date: {selectedDates.endDate ? new Date(selectedDates.endDate).toLocaleDateString() : 'None'}</p>
      </footer>
    </div>
  );
};

export default Calendar;