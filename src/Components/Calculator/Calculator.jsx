import React, { useState, useRef } from "react";
import styles from "./Calculator.module.css";
import { useEffect } from "react";

function Calculator() {
  const [switcherStates, setSwitcherStates] = useState([1, 2, 3]);
  const [switcherState, setSwitcherState] = useState(1);
  const [result, setResult] = useState("0");

  function handleSwitcherChange() {
    const newState = (switcherState % 3) + 1;
    setSwitcherState(newState);
  }
  useEffect(() => {
    document
      .getElementById("container")
      .classList.remove("theme1", "theme2", "theme3");
    document.getElementById("container").classList.add(`theme${switcherState}`);
  }, [switcherState]);

  useEffect(() => {
    document.getElementById("container").classList.add(`theme${switcherState}`);
  }, []);

  function handleNumberOrDotAddition(number) {
    if (result.length > 12) return;
    setResult(result === "0" ? number : result + number);
  }

  function handleDeletion() {
    if (result.length === 1) return setResult("0");
    setResult(result.slice(0, -1));
  }

  return (
    <div className={`${styles.container} theme1`} id="container">
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
          <span>{result}</span>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => handleNumberOrDotAddition("7")}>7</button>
          <button onClick={() => handleNumberOrDotAddition("8")}>8</button>
          <button onClick={() => handleNumberOrDotAddition("9")}>9</button>
          <button
            className={`${styles.action} ${styles.delete}`}
            onClick={handleDeletion}
          >
            del
          </button>
          <button onClick={() => handleNumberOrDotAddition("4")}>4</button>
          <button onClick={() => handleNumberOrDotAddition("5")}>5</button>
          <button onClick={() => handleNumberOrDotAddition("6")}>6</button>
          <button className={styles.action}>+</button>
          <button onClick={() => handleNumberOrDotAddition("1")}>1</button>
          <button onClick={() => handleNumberOrDotAddition("2")}>2</button>
          <button onClick={() => handleNumberOrDotAddition("3")}>3</button>
          <button className={styles.action}>-</button>
          <button onClick={() => handleNumberOrDotAddition(".")}>.</button>
          <button onClick={() => handleNumberOrDotAddition("0")}>0</button>
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
