'use client';

import React, { useState } from 'react';
import styles from './DonutChart.module.css';

interface Segment {
  label: string;
  value: number;
  color: string;
  startPercent?: number;
  endPercent?: number;
}

interface DonutChartProps {
  data: Segment[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const [status, setStatus] = useState<Partial<Segment>>({});

  const calculateSegments = (): Segment[] => {
    let cumulativePercent = 0;
    return data.map((item) => {
      const startPercent = cumulativePercent;
      cumulativePercent += item.value / 100;
      const endPercent = cumulativePercent;
      return {
        ...item,
        startPercent,
        endPercent,
      };
    });
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle * 360);
    const end = polarToCartesian(x, y, radius, startAngle * 360);

    const largeArcFlag = endAngle - startAngle <= 0.5 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z',
    ].join(' ');
  };

  return (
    <section className={styles.container}>
      <div className={styles.chartWrapper}>
        <svg className={styles.chartSvg} viewBox="0 0 42 42">
          {calculateSegments().map((segment, index) => (
            <path
              key={index}
              d={describeArc(21, 21, 15.9155, segment.startPercent || 0, segment.endPercent || 0)}
              fill={segment.color}
            />
          ))}
          <circle cx="21" cy="21" r="10" fill="white" />
        </svg>
        <div className={styles.centerLabel}>
          <div className={styles.labelContent}>
            <div className={styles.value}>
              {status.value !== undefined ? status.value : data[0]?.value || 0}%
            </div>
            <span className={styles.label}>
              {status.label || data[0]?.label || ''}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.legend}>
        {data.map((item, index) => (
          <button
            key={index}
            className={styles.legendButton}
            onClick={() => setStatus(item)}
          >
            <div
              style={{ backgroundColor: item.color }}
              className={styles.legendCircle}
            ></div>
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default DonutChart;