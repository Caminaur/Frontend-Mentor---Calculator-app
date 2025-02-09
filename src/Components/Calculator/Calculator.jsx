import React from "react";
import styles from "./Calculator.module.css";

function Calculator() {
  return (
    <div className={styles.calculator}>
      <div className={styles.firstRow}>
        <span>calc</span>

        <div>
          <p>Theme</p>

          {/* Three buttons with different themes */}
          <button>Switcher</button>
        </div>
      </div>

      <div className={styles.results}>
        <input type="text" placeholder="0" />
      </div>

      <div className={styles.buttons}>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className={styles.action}>del</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className={styles.action}>+</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className={styles.action}>-</button>
        <button>.</button>
        <button>0</button>
        <button className={styles.action}>/</button>
        <button className={styles.action}>x</button>
        <button className={styles.action}>Reset</button>
        <button className={styles.action}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
