interface Fun<a, b> {
    f: (i: a) => b,
    then: <c>(g: Fun<b, c>) => Fun<a, c>
}

let Fun = function <a, b>(f: (_: a) => b): Fun<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(a => g.f(this.f(a)))}
    }
}

type Tile<a> = {
    kind: "terrain"
} | {
    kind: "town"
} | {
    kind: "army"
}


type List<a> = {
    kind: "Cons"
    head: a
    tail: List<a>
} | {
    kind: "Empty"
}

//constructor to create a Cons
let cons = function<a> (value: a, t: List<a>) : List<a> {
    return {
        kind: "Cons",
        head: value,
        tail: t
    }
}

//constructor to create an Empty
let empty = function<a> () : List<a> {
    return {
        kind: "Empty"
    }
}

// convert terain -> town, destroy town or army, reverting a town back to terain,terain to army, any other keeps unchanged
