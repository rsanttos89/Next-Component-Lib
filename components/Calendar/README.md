# Calendar Component

## Overview

The `Calendar` component is a React-based calendar that allows users to select a date range. It provides navigation for the current month and displays the days in a grid format. When a user clicks on a day, it updates the selected date range (start and end date) and passes the selected values back to the parent component through the `onValueChange` callback.

## How to Use

1. **Installation**: Import the `Calendar` component into your React component.

2. **Usage**: To use the calendar in your React app, pass a function to the `onValueChange` prop. This function will receive the selected start and end dates when the user picks a date range.

### Example:

```tsx
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
```

### Explanation:

- **`onValueChange` Prop**: 
  - This prop is a function passed from the parent component to the `Calendar`. The function will receive the `SelectedDates` object, which contains `startDate` and `endDate`.
  - The `startDate` and `endDate` are in Unix timestamp format (milliseconds since the epoch).

- **Displaying Selected Dates**: 
  - In the example, `valueFromChild` stores the selected start and end dates, and they are displayed as timestamps. You can format them as needed.

### Key Features:

- **Month Navigation**: 
  - The user can navigate to the previous or next month using the arrows at the top of the calendar.

- **Date Selection**: 
  - When a user clicks on a day, it will either set the `startDate`, `endDate`, or reset the selection based on the current state.

- **Date Range**: 
  - The user can select a range of dates. If the user clicks a date before the selected `startDate`, the dates will be swapped automatically.

- **Today Highlight**: 
  - The current day is highlighted with a different style.

### Customization:

- **Styling**: 
  - The calendar's appearance can be customized by modifying the CSS classes in the `Calendar.module.css` file. The component already includes basic styles for the calendar layout, days, and selected dates.

- **Date Format**: 
  - You can adjust how dates are displayed in the calendar header or in the parent component by formatting the `startDate` and `endDate` values before displaying them.

### Props:

- **`onValueChange(value: SelectedDates)`**: 
  - A callback function that is called whenever the selected date range changes. It provides the updated `SelectedDates` object containing `startDate` and `endDate`.

### Interfaces:

- **`SelectedDates`**: 
  - Represents the selected date range with `startDate` and `endDate` as Unix timestamps (milliseconds).
  
```ts
export interface SelectedDates {
  startDate: number | null;
  endDate: number | null;
}
```

This component provides a clean and functional calendar UI for selecting date ranges in your React applications.