Aqui está a documentação corrigida e atualizada para o novo componente `DonutChart`, que aceita um número arbitrário de segmentos:

---

# DonutChart Component

A React component for rendering a customizable donut chart, ideal for visualizing proportional data with multiple segments. The chart includes an interactive legend and dynamic styling.

---

## Features

- **Dynamic Segments**: Supports any number of data segments, each with its own label, value, and color.
- **Interactive Legend**: Users can interact with the chart by clicking on legend buttons to update the displayed segment.
- **Customizable Styling**: Fully styled using a CSS module for easy customization.

---

## Installation

To use the `DonutChart` component in your project:

1. Add the `DonutChart` component file to your project.
2. Include the associated CSS module `DonutChart.module.css` for styling.

---

## Usage

Import the `DonutChart` component and pass an array of data segments as a prop.

```tsx
'use client';

import React from 'react';
import DonutChart from './DonutChart';

const App = () => {
  const chartData = [
    { label: 'Corrects', value: 70, color: '#4F63E7' },
    { label: 'Errors', value: 20, color: '#F2994A' },
    { label: 'Partial', value: 10, color: '#56CCF2' },
  ];

  return (
    <div>
      <h1>Results</h1>
      <DonutChart data={chartData} />
    </div>
  );
};

export default App;
```

### Props

| Prop Name | Type        | Description                                 | Example Value                                                                 |
|-----------|-------------|---------------------------------------------|-------------------------------------------------------------------------------|
| `data`    | `Segment[]` | An array of segments, where each segment includes `label`, `value`, and `color`. | `[{ label: 'Corrects', value: 70, color: '#4F63E7' }]`                       |

### Segment Object

Each segment in the `data` array should have the following structure:

| Field    | Type     | Description                                     | Example Value |
|----------|----------|-------------------------------------------------|---------------|
| `label`  | `string` | The label for the segment.                      | `'Corrects'`  |
| `value`  | `number` | The proportional value for the segment.         | `70`          |
| `color`  | `string` | The color for the segment (any valid CSS color).| `'#4F63E7'`   |

---

## Component Structure

- **Data Segments**: The component dynamically calculates chart segments based on the input `data` array.
- **SVG Paths**: Renders smooth arcs using SVG paths for each segment.
- **Interactive Legend**: Clicking on a legend item updates the displayed data in the center of the chart.

---

## Styling

The component uses a CSS module (`DonutChart.module.css`) for styling. Below is an example of how the CSS file can be structured:

---

## Functions

### `calculateSegments`
Calculates the start and end percentages for each chart segment based on the total value of all segments.

### `polarToCartesian`
Converts polar coordinates to Cartesian coordinates for rendering SVG arcs.

### `describeArc`
Generates an SVG path string for a segment, using start and end angles.

---

## Accessibility

- **Keyboard Navigation**: Legend buttons are focusable and can be activated using the keyboard.
- **Visual Clarity**: High-contrast colors ensure the chart is easily distinguishable.

---

## Notes

- The sum of all `value` fields in the `data` array should ideally equal 100 to represent a complete dataset.
- Inner circle color and size can be customized through the CSS module.

---

## Future Improvements

- **Real-Time Updates**: Support for dynamically updating the chart data without re-rendering the component.
- **Animations**: Smooth transitions for data changes to improve user experience.
- **Tooltips**: Add tooltips to display detailed segment information on hover.

Feel free to contribute enhancements or suggest improvements!