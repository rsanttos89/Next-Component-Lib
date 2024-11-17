# AnimatedTextWithDecimal Component

A React component for animating numerical values, providing a smooth transition from `0` to the `targetValue` over a specified duration. The animated value supports formatting with or without decimal places.

---

## Features

- **Smooth Animation**: Transitions the displayed number from `0` to the target value.
- **Decimal Support**: Dynamically formats numbers with up to two decimal places for precision.
- **Customizable Duration**: Easily adjustable duration for the animation (default is `1000ms`).

---

## Installation

To use the `AnimatedTextWithDecimal` component in your project:

1. Add the `AnimatedTextWithDecimal` component file to your project.
2. Import and use it where needed.

---

## Usage

```jsx
'use client';

import React from 'react';
import AnimatedTextWithDecimal from './AnimatedTextWithDecimal';

const App = () => {
  return (
    <div>
      <h1>Animated Number</h1>
      <AnimatedTextWithDecimal targetValue={1234.56} />
    </div>
  );
};

export default App;
```

---

## Props

| Prop Name     | Type   | Description                          | Example Value |
|---------------|--------|--------------------------------------|---------------|
| `targetValue` | number | The final value the animation should reach. | `1234.56` |

---

## Component Behavior

- **Animation**: The animation progresses from `0` to the specified `targetValue` over `1000ms`.
- **Responsive Updates**: If the `targetValue` changes, the animation restarts to animate towards the new value.
- **Formatting**: The component automatically formats numbers:
  - Whole numbers (e.g., `100`) display without decimals.
  - Decimal values (e.g., `123.45`) display with up to two decimal places.

---

## Styling

The component outputs the animated value inside a `<span>`. You can apply custom styles using CSS classes in the parent component or by wrapping it in a styled container.

```jsx
<div className="animated-text">
  <AnimatedTextWithDecimal targetValue={500.75} />
</div>
```

```css
.animated-text span {
  font-size: 2rem;
  font-weight: bold;
  color: #4a90e2;
}
```

---

## Customization

To modify the animation duration, update the `duration` variable in the `useEffect` block:

```javascript
const duration = 2000; // Animation duration in milliseconds
```

---

## Key Functions

### `animateValue`
- Calculates the progress of the animation based on elapsed time.
- Updates the displayed value using `setDisplayValue`.
- Stops the animation when progress reaches `1` (100%).

---

## Accessibility

- **Screen Readers**: Ensure the parent component provides context for the displayed value (e.g., labels or headings).
- **Keyboard Focus**: Not required as the component displays a static value post-animation.

---

## Future Enhancements

- **Customizable Duration**: Allow `duration` to be passed as a prop for flexibility.
- **Easing Functions**: Add support for easing curves (e.g., ease-in-out) for smoother transitions.
- **Unit Display**: Add options to append units (e.g., `$`, `%`, or `kg`).

---

## Notes

- Ensure `targetValue` is a valid number. Passing `NaN` or `undefined` may cause unexpected behavior.
- For large values, consider limiting decimal precision to improve performance.