/*
Extend the List functor with the monoid operations for functors:

let unit: <a>() => Fun<a, List<a>>
let join: <a>() => Fun<List<List<a>>, List<a>>
Hint: the `plus` function you defined for lists in a previous exercise might come in handy!
 */
import {Fun} from "../lecture1/p1";
import {cons, empty, List} from "../lecture2/L2p1";
import {concat} from "./L3p2";


export let unit_List = function<a>() : Fun<a, List<a>> {
    return Fun<a, List<a>>((x: a) => cons<a>(x, empty<a>()))
}

export let join_List = function<a>() : Fun<List<List<a>>, List<a>> {
    let g = (l : List<List<a>>): List<a> => {
        if (l.kind == "Empty") {
            return empty<a>()
        }
        else if (l.tail.kind == "Empty") {
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