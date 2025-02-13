import React, { useState, useRef, useCallback } from "react";
import styles from "./Calculator.module.css";
import { useEffect } from "react";

function Calculator() {
  const [currentOperator, setCurrentOperator] = useState(null);
  const [switcherState, setSwitcherState] = useState(1);
  const [result, setResult] = useState("0");
  const [displayedResult, setDisplayedResult] = useState("0");
  const [previousResult, setPreviousResult] = useState(null);
  const [justCalculated, setJustCalculated] = useState(false);
  const [isReset, setIsReset] = useState(false);

  function handleSwitcherChange() {
    const newState = (switcherState % 3) + 1;
    setSwitcherState(newState);
    localStorage.setItem("theme", newState);
  }

  function formatDisplayResult(number) {
    const formattedResult = new Intl.NumberFormat().format(parseFloat(number));
    setDisplayedResult(formattedResult);
  }

  const handleKeyDown = useCallback(
    (event) => {
      // si es un numero
      if (!isNaN(parseInt(event.key)) || event.key === ".") {
        handleNumberOrDotAddition(event.key);
      }

      // // si es un operador
      if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "/" ||
        event.key === "*"
      ) {
        handleOperator(event.key);
      }

      if (event.key === "Enter") handleEqual();

      // si es la tecla de borrar
      if (event.key === "Backspace") handleDeletion();
    },
    [result, currentOperator, displayedResult]
  );

  function handleNumberOrDotAddition(number) {
    if (isReset && number !== ".") {
      setResult(number);
      formatDisplayResult(number);
      setIsReset(false);
      return;
    }
    // aqui hay un problema al ingresar el segundo numero
    if (result === "0" || justCalculated) {
      const newResult = number === "." ? "0." : number;
      setResult(() => number);
      formatDisplayResult(newResult);
      setJustCalculated(false);
      return;
    }
    if (result.length > 12) return;
    if (justCalculated) {
      // overwrite
      setResult(() => number);
      setDisplayedResult(number);
      setJustCalculated(false);
    } else {
      // append
      let r = result === "0" ? number : result + number;
      setResult(() => r);
      setDisplayedResult(r);
    }
  }

  function handleEqual() {
    if (!currentOperator) return;

    const currentValue = parseFloat(result);
    const prevValue = parseFloat(previousResult) || 0; // Asegura que no sea null
    let calcResult;

    // 🚨 Check for division by zero
    if (currentOperator === "/" && currentValue === 0) {
      setResult("Error");
      setDisplayedResult("Cannot divide by 0");
      setPreviousResult(null);
      setCurrentOperator(null);
      setJustCalculated(true);
      return;
    }

    switch (currentOperator) {
      case "+":
        calcResult = prevValue + currentValue;
        break;
      case "-":
        calcResult = prevValue - currentValue;
        break;
      case "/":
        calcResult = prevValue / currentValue;
        break;
      case "*":
        calcResult = prevValue * currentValue;
        break;
      default:
        return;
    }

    if (
      !isNaN(calcResult) &&
      calcResult !== Infinity &&
      calcResult !== -Infinity
    ) {
      setResult(calcResult.toString());
      formatDisplayResult(calcResult.toString());
      setPreviousResult(null);
      setCurrentOperator(null);
      setJustCalculated(true);
      return;
    } else {
      setResult("Error");
      setDisplayedResult("That calculation is not possible! :(");
    }

    // Ensure the next operation is ready
    setJustCalculated(false);
  }

  function handleOperator(operator) {
    if (currentOperator) {
      setCurrentOperator(operator);
    } else {
      setPreviousResult(result);
      setResult("0");
      setDisplayedResult(operator);
      setCurrentOperator(operator);
      setJustCalculated(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Limpieza
    };
  }, [result, currentOperator, displayedResult]);

  useEffect(() => {
    document
      .getElementById("container")
      .classList.remove("theme1", "theme2", "theme3");
    document.getElementById("container").classList.add(`theme${switcherState}`);
  }, [switcherState]);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    setSwitcherState(() => theme);
    document.getElementById("container").classList.add(`theme${theme}`);
  }, []);

  function handleDeletion() {
    if (result.length === 1) {
      setResult("0");
      formatDisplayResult("0");
    }
    setResult(result.slice(0, -1));
    formatDisplayResult(result.slice(0, -1));
  }

  function handleReset() {
    setResult(() => "0");
    formatDisplayResult("0");
    setPreviousResult(() => null);
    setCurrentOperator(() => null);
    setJustCalculated(() => false);
    setIsReset(true);
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
          <span>{displayedResult}</span>
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
          <button
            className={styles.action}
            onClick={() => {
              handleOperator("+");
            }}
          >
            +
          </button>
          <button onClick={() => handleNumberOrDotAddition("1")}>1</button>
          <button onClick={() => handleNumberOrDotAddition("2")}>2</button>
          <button onClick={() => handleNumberOrDotAddition("3")}>3</button>
          <button
            className={styles.action}
            onClick={() => {
              handleOperator("-");
            }}
          >
            -
          </button>
          <button onClick={() => handleNumberOrDotAddition(".")}>.</button>
          <button onClick={() => handleNumberOrDotAddition("0")}>0</button>
          <button
            className={styles.action}
            onClick={() => {
              handleOperator("/");
            }}
          >
            /
          </button>
          <button
            className={styles.action}
            onClick={() => {
              handleOperator("*");
            }}
          >
            x
          </button>
          <button
            className={`${styles.action} ${styles.reset}`}
            onClick={() => {
              // Necesary to remove the focus from the reset button
              document.activeElement.blur();
              handleReset();
            }}
          >
            Reset
          </button>
          <button
            className={`${styles.action} ${styles.equal}`}
            onClick={handleEqual}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
