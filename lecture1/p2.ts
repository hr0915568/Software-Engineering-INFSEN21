import {Fun} from "./p1";

// Complete the code of repeat, which repeats a function n times.

/*
let repeat = function<a>(f: Fun<a, a>, n: number): Fun<a, a> {
  if (n <= 0) {
    //COMPLETE
  }
  else {
    //COMPLETE
  }
}

export let Fun = function <a, b>(f: (_: a) => b): Fun<a, b> {
  return {
    f: f,
    then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
      return Fun<a, c>(a => g.f(this.f(a)))},
    repeat: function(this: Fun<a, a>): Fun<number,Fun<a, a>> {
       //COMPLETE
    }
  }
}
 */
export interface FunWithRepeat<a, b> {
    f: (i: a) => b,
    then: <c>(g: Fun<b, c>) => Fun<a, c>,
    repeat: () => Fun<number,Fun<a, a>>
}

let repeat = function<a>(f: Fun<a, a>, n: number): Fun<a, a> {
    if (n <= 0) {
        return f;
    }
    else {
        return f.then(repeat(f, n - 1));
    }
}

export let FunWithRepeat = function <a, b>(f: (_: a) => b): FunWithRepeat<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(a => g.f(this.f(a)))},
        repeat: function(): Fun<number,Fun<a, a>> {
            return Fun((x: number) => repeat(this, x));
        }
    }
}

export let incr = FunWithRepeat((x: number) => x + 1)

// foo.repeat().f(5).f(x)
// test
console.log('incr.repeat().f(1).f(1): ' + incr.repeat().f(1).f(1));
