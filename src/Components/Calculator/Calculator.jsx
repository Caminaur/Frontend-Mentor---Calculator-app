import React, { useState } from "react";
import styles from "./Calculator.module.css";

function Calculator() {
  const [switcherStates, setSwitcherStates] = useState([1, 2, 3]);
  const [switcherState, setSwitcherState] = useState(1);

  function handleSwitcherChange() {
    const newState = (switcherState % 3) + 1;
    setSwitcherState(newState);
  }

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.firstRow}>
          <span className={styles.title}>calc</span>

          <div className={styles.themeSelector}>
            <p>Theme</p>

            {/* Three buttons with different themes */}
            <div className={styles.switcher} data-state={switcherState}>
              <div className={styles.positions}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <div className={styles.button} onClick={handleSwitcherChange}>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.results}>
          <span>4,815,162,342</span>
        </div>

        <div className={styles.buttons}>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className={`${styles.action} ${styles.delete}`}>del</button>
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
          <button className={`${styles.action} ${styles.reset}`}>Reset</button>
          <button className={`${styles.action} ${styles.equal}`}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
