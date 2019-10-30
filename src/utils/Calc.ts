export interface ICalc {
  doMath(a: number, b: number): number;
}

export class SumCalc implements ICalc {
  doMath(a, b) {
    return a + b;
  }
}

export class MinusCalc implements ICalc {
  doMath(a, b) {
    return a - b;
  }
}
