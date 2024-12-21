'use client';

import React, { useState } from "react";
import styles from "./page.module.css";
import Calendar, { SelectedDates } from "@/components/Calendar";

export default function Root() {
  const [valueFromChild, setValueFromChild] = useState<SelectedDates | null>(null);
  
  const handleChildValue = (value: SelectedDates) => {
    setValueFromChild(value);
  };
  
  return (
    <div className={styles.root}>
      {valueFromChild?.startDate}
      <br />
      {valueFromChild?.endDate}
      <Calendar onValueChange={handleChildValue} />
    </div>
  );
}