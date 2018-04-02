

/*
Extend the type Fun<a, b> with an additional method repeatUntil that takes a predicate and repeats a function until the
predicate returns false.
 */

/*
let repeatUntil = function<a>(f: Fun<a, a>, predicate: Fun<a, boolean>) : Fun<a, a> {
  let g =
    (x: a) => {
      if (predicate.f(x)) {
        //COMPLETE
      }
      else {
        //COMPLETE
      }
    }
  return //COMPLETE
}

repeatUntil: function(this: Fun<a, a>): Fun<a, c> {
  return {
    f: this.f,
    then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
      return Fun<a, c>(a => g.f(this.f(a)))},
    repeatUntil: function(this: Fun<a, a>): Fun<Fun<a, boolean>, Fun<a, a>> {
      //COMPLETE
    }
  }
}
 */



interface Fun<a, b> {
    f: (i: a) => b,
    then: <c>(g: Fun<b, c>) => Fun<a, c>,
    repeatUntil: () => Fun<Fun<a, boolean>, Fun<a, a>>
}

// constructor
let Fun = function <a, b>(f: (_: a) => b): Fun<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(a => g.f(this.f(a)))},
        repeatUntil: function(): Fun<Fun<a, boolean>, Fun<a, a>> {
            return Fun((p: Fun<a, boolean>) => repeatUntil(this, p));
        }
    }
}

let repeatUntil = function<a>(f: Fun<a, a>, predicate: Fun<a, boolean>) : Fun<a, a> {
    let g =
        (x: a) => {
            if (predicate.f(x)) {
                return x;
            }
            else {
                return g(f.f(x));
            }
        }
    return Fun((x: a) => g(x));
}

// foo.repeatUntil().f(predicate).f(1)

let incr = Fun((x: number) => x + 1)
let pr = Fun<number, boolean>((x: number) => x >= 5)
incr.repeatUntil().f(pr).f(1); //repeat until number is bigger than or equal 5

console.log('incr.repeatUntil().f(pr).f(1): ' + incr.repeatUntil().f(pr).f(1));