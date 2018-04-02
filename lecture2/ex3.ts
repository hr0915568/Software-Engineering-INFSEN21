

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
