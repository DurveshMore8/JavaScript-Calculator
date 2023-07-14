import React from "react";
import * as math from "mathjs";
import "./App.css";

const isOperator = /[+\-*/]$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      answer: "0",
    };
    this.clean = this.clean.bind(this);
    this.operator = this.operator.bind(this);
    this.number = this.number.bind(this);
    this.decimal = this.decimal.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clean() {
    this.setState(() => {
      return { expression: "", answer: "0" };
    });
  }

  operator() {
    const leng = this.state.expression.length;
    if (this.state.expression.includes("=")) {
      this.setState((state) => {
        return {
          expression: state.answer + event.target.value,
          answer: event.target.value,
        };
      });
    } else if (
      isOperator.test(this.state.expression[leng - 1]) &&
      isOperator.test(this.state.expression[leng - 2])
    ) {
      this.setState((state) => {
        return {
          expression: state.expression.slice(0, leng - 2) + event.target.value,
          answer: event.target.value,
        };
      });
    } else if (
      isOperator.test(this.state.expression[leng - 1]) &&
      event.target.value !== "-"
    ) {
      this.setState((state) => {
        return {
          expression: state.expression.slice(0, leng - 1) + event.target.value,
          answer: event.target.value,
        };
      });
    } else {
      this.setState((state) => {
        return {
          expression: state.expression + event.target.value,
          answer: event.target.value,
        };
      });
    }
  }

  number() {
    if (isOperator.test(this.state.answer)) {
      this.setState((state) => {
        return {
          answer: event.target.value,
          expression: state.expression + event.target.value,
        };
      });
    } else {
      this.setState((state) => {
        if (this.state.answer === "0") {
          return { answer: event.target.value, expression: event.target.value };
        } else if (this.state.expression.includes("=")) {
          return {
            answer: event.target.value,
            expression: event.target.value,
          };
        } else {
          return {
            answer: state.answer + event.target.value,
            expression: state.expression + event.target.value,
          };
        }
      });
    }
  }

  decimal() {
    this.setState((state) => {
      // If string don't have a decimal and string's last character isn't a decimal.
      if (
        state.answer.includes(".") === false &&
        state.answer[state.answer.length - 1] !== "."
      ) {
        return {
          answer: state.answer + event.target.value,
          expression: state.expression + event.target.value,
        };
      }
    });
  }

  calculate() {
    this.setState((state) => {
      return {
        answer: math.round(eval(this.state.expression), 12),
        expression:
          state.expression + "=" + math.round(eval(this.state.expression), 12),
      };
    });
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <div className="expression">
            <span>{this.state.expression}</span>
          </div>
          <div className="answer" id="display">
            <span>{this.state.answer}</span>
          </div>
          <div className="buttons">
            <button id="clear" className="wide" onClick={this.clean}>
              AC
            </button>
            <button
              id="divide"
              className="operators"
              value="/"
              onClick={this.operator}
            >
              /
            </button>
            <button
              id="multiply"
              className="operators"
              value="*"
              onClick={this.operator}
            >
              x
            </button>
            <button
              id="seven"
              className="numbers"
              value="7"
              onClick={this.number}
            >
              7
            </button>
            <button
              id="eight"
              className="numbers"
              value="8"
              onClick={this.number}
            >
              8
            </button>
            <button
              id="nine"
              className="numbers"
              value="9"
              onClick={this.number}
            >
              9
            </button>
            <button
              id="subtract"
              className="operators"
              value="-"
              onClick={this.operator}
            >
              -
            </button>
            <button
              id="four"
              className="numbers"
              value="4"
              onClick={this.number}
            >
              4
            </button>
            <button
              id="five"
              className="numbers"
              value="5"
              onClick={this.number}
            >
              5
            </button>
            <button
              id="six"
              className="numbers"
              value="6"
              onClick={this.number}
            >
              6
            </button>
            <button
              id="add"
              className="operators"
              value="+"
              onClick={this.operator}
            >
              +
            </button>
            <button
              id="one"
              className="numbers"
              value="1"
              onClick={this.number}
            >
              1
            </button>
            <button
              id="two"
              className="numbers"
              value="2"
              onClick={this.number}
            >
              2
            </button>
            <button
              id="three"
              className="numbers"
              value="3"
              onClick={this.number}
            >
              3
            </button>
            <button id="equals" className="long" onClick={this.calculate}>
              =
            </button>
            <button
              id="zero"
              value="0"
              onClick={this.number}
              style={{ backgroundColor: "#4d4d4d" }}
              className="wide"
            >
              0
            </button>
            <button
              id="decimal"
              className="numbers"
              value="."
              onClick={this.decimal}
            >
              .
            </button>
          </div>
        </div>
        <div className="creator">
          <span className="info">Design and Coded By</span>
          <span className="coder">Durvesh More</span>
        </div>
      </div>
    );
  }
}

export default App;
