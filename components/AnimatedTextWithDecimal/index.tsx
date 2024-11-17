'use client';

import React, { useEffect, useState } from "react";

function AnimatedTextWithDecimal({ targetValue }: { targetValue: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    function animateValue(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = progress * targetValue;

      setDisplayValue(value);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    }

    requestAnimationFrame(animateValue);
  }, [targetValue]);

  const formattedValue = Number.isInteger(displayValue)
    ? displayValue.toFixed(0)
    : displayValue.toFixed(2);

  return <span>{formattedValue}</span>;
}

export default AnimatedTextWithDecimal;
