export interface Fun<a, b> {
    f: (i: a) => b,
    then: <c>(g: Fun<b, c>) => Fun<a, c>
}

// constructor
export let Fun = function <a, b>(f: (_: a) => b): Fun<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(a => g.f(this.f(a)))}
    }
}

export let incr = Fun((x: number) => x + 1)
let double = Fun((x: number) => x * 2)
let square = Fun((x: number) => x * x)
let isPositive = Fun((x: number) => x > 0)
let isEven = Fun((x: number) => x % 2 == 0)
let invert = Fun((x: number) => -x)
let squareRoot = Fun((x: number) => Math.sqrt(x))
let ifThenElse = function<a, b>(p: Fun<a, boolean>, _then: Fun<a, b>, _else: Fun<a, b>) : Fun<a, b> {
        return Fun((x: a) => {
            if (p.f(x)) {
                return _then.f(x)
            }
            else {
                return _else.f(x)
            }
        })
    }
    /*
    implement the following functions in terms of function composition

Increment a number and then check if it is positive
Increment a number, double it and check if it is positive
Implement a function that computes the square root if the input is positive, otherwise inverts it and then performs the square root
Square a number and then if it is even invert it otherwise do the square root
     */

let incrThenIsPositive = incr.then(isPositive);
console.log('incrThenIsPositive.f(1):' + incrThenIsPositive.f(1));
console.log('incrThenIsPositive.f(0):' + incrThenIsPositive.f(0));
console.log('incrThenIsPositive.f(-1):' + incrThenIsPositive.f(-1));

let increThenDoubleIsPositive = incr.then(double).then(isPositive);
console.log('increThenDoubleIsPositive.f(-2): ', increThenDoubleIsPositive.f(-2));
console.log('increThenDoubleIsPositive.f(0): ', increThenDoubleIsPositive.f(0));
console.log('increThenDoubleIsPositive.f(1): ', increThenDoubleIsPositive.f(1));
