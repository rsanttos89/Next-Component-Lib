import AnimatedTextWithDecimal from "@/components/AnimatedTextWithDecimal";
import styles from "./page.module.css";

export default function Root() {
  return (
    <div className={styles.root}>
      <AnimatedTextWithDecimal targetValue={0} />
    </div>
  );
}