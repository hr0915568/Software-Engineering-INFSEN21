/*
Implement the bind operator for the List monoid:

let bind = function<a, b>(k: Fun<a, List<b>>): Fun<List<a>,List<b>> {...}
 */

import {Fun} from "../lecture1/p1";

//LIST MONOID
type List<a> = ({
    kind: "empty"
} | {
    kind: "::" //x :: xs
    head: a
    tail: List<a>
}) & {
    then: <b>(k: Fun<a, List<b>>) => List<b>
}

let bind_List = function<a,b>(l: List<a>, k: Fun<a, List<b>>): List<b> {
    // see definition of bind. write out the definition out first then implement then implement the needed functions
    // such as map_list2 and join_list later.
    return map_List2(k).then(join_List()).f(l);
}

export let Empty = function<a>(): List<a> {
    return {
        kind: "empty",
        then: function<b>(k: Fun<a, List<b>>): List<b> {
            return bind_List(this, k)
        }
    }
}

export let Cons = function<a>(first: a, rest: List<a>): List<a> {
    return {
        kind: "::",
        head: first,
        tail: rest,
        then: function<b>(k: Fun<a, List<b>>): List<b> {
            return bind_List(this, k)
        }
    }
}

let join_List = function<a>() : Fun<List<List<a>>, List<a>> {
    let g = (l : List<List<a>>): List<a> => {
        if (l.kind == "empty") {
            return Empty<a>()
        }
        else if (l.tail.kind == "empty") {
            return l.head
        }
        else {
            let flattened = concat(l.head,l.tail.head)
            let flattenRest = g(l.tail.tail)
            return concat(flattened,flattenRest)
        }
    }
    return Fun<List<List<a>>, List<a>>(g)
}

let concat = function<a>(l1: List<a>, l2:List<a>): List<a> {
    if (l1.kind == "empty") {
        return l2
    }
    else {
        let restConcat = concat(l1.tail, l2)
        return Cons<a>(l1.head, restConcat)
    }
}

export let map_List2 = function<a, b>(mapper: Fun<a, b>): Fun<List<a>, List<b>> {
    let g = (l: List<a>): List<b> => {
        if (l.kind == "empty") {
            return Empty<b>();
        }
        else {
            let newList = g(l.tail)
            let newHead = mapper.f(l.head)
            return Cons<b>(newHead, newList)
        }
    }
    return Fun<List<a>, List<b>>(g)
}

