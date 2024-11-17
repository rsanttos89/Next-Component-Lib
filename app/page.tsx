import styles from "./page.module.css";
// import AnimatedTextWithDecimal from "@/components/AnimatedTextWithDecimal";
import DonutChart from "@/components/DonutChart";

export default function Root() {
  return (
    <div className={styles.root}>
      {/* <AnimatedTextWithDecimal targetValue={0} /> */}
      <DonutChart errors={35} corrects={65} />
    </div>
  );
}