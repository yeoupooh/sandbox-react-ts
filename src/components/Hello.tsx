import * as React from "react";
import * as C from "../utils/Calc";

const Hello = props => {
  var calc: C.ICalc = new C.MinusCalc();
  // var calc: ICalc = new SumCalc();
  var result = calc.doMath(1, 2);
  return (
    <div className="App">
      <h1>Hello1 {props.name}</h1>
      <p>result: {result}</p>
    </div>
  );
};

export default Hello;
