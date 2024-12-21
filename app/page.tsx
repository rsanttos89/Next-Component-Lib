import React from "react";
import styles from "./page.module.css";
// import AnimatedTextWithDecimal from "@/components/AnimatedTextWithDecimal";
// import DonutChart from "@/components/DonutChart";
import Calendar from "@/components/Calendar";

export default function Root() {
  // const chartData = [
  //   { label: 'Acertos', value: 60, color: '#4F63E7' },
  //   { label: 'Erros', value: 30, color: '#F2994A' },
  //   { label: 'Parciais', value: 10, color: '#56CCF2' },
  // ];
  
  return (
    <div className={styles.root}>
      {/* <AnimatedTextWithDecimal targetValue={0} /> */}
      {/* return <DonutChart data={chartData} />; */}
      <Calendar />
    </div>
  );
}