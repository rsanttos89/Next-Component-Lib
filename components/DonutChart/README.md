# DonutChart Component

A React component for rendering a donut chart, useful for visualizing proportional data like "correct" and "error" values in percentages. This component includes interactive legend buttons that update the chart's displayed data.

---

## Features

- **Interactive Chart**: Allows users to view specific data segments by clicking legend buttons.
- **Dynamic Styling**: Fully styled with an associated CSS module.
- **Customizable Colors**: Each segment of the donut chart has its own color.

---

## Installation

To use the `DonutChart` component in your project, ensure you have a React environment set up. Then, add the file to your project.

1. Add the `DonutChart` component to your project.
2. Add the associated CSS module `DonutChart.module.css` for styling.

---

## Usage

Import the `DonutChart` component and use it in your application.

```jsx
'use client';

import React from 'react';
import DonutChart from './DonutChart';

const App = () => {
  return (
    <div>
      <h1>Results</h1>
      <DonutChart errors={20} corrects={80} />
    </div>
  );
};

export default App;
```

### Props

| Prop Name | Type   | Description                              | Example Value |
|-----------|--------|------------------------------------------|---------------|
| `errors`  | number | Percentage of errors to display (0-100). | `20`          |
| `corrects`| number | Percentage of corrects to display (0-100).| `80`         |

---

## Component Structure

- **Data Segments**: Each segment (`Acertos` and `Erros`) is dynamically calculated based on the input values (`errors` and `corrects`).
- **SVG Paths**: The chart is drawn using SVG arcs, ensuring smooth and precise visualization.
- **Interactive Legend**: Clicking on a legend item updates the center label with the associated data.

---

## Styling

The component relies on a CSS module (`DonutChart.module.css`) for styling. Below is an example of how you might structure the CSS:

---

## Functions

### `calculateSegments`
Calculates the start and end percentages for each chart segment, based on the input data.

### `polarToCartesian`
Converts polar coordinates to Cartesian for SVG rendering.

### `describeArc`
Generates the SVG path for a chart segment using start and end angles.

---

## Accessibility

- **Keyboard Navigation**: The legend buttons can be navigated and activated using the keyboard.
- **Visual Indicators**: High contrast colors make the chart segments easy to distinguish.

---

## Notes

- Ensure that the `errors` and `corrects` props add up to 100 for the chart to represent complete data.
- The inner circle color and size can be customized via the `CSS` file.

---

## Future Improvements

- **Dynamic Data Update**: Allow real-time updates to the chart based on external inputs.
- **Animations**: Add smooth transitions for a better user experience.
- **Tooltips**: Display detailed information on hover. 

Feel free to contribute enhancements or suggest improvements!