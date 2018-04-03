/*
Define the list as a monoid with the following monoidal operations:

let zero: <a>() => Fun<unit, List<a>>
let plus: <a>() => Fun<Pair<List<a>,List<a>>,List<a>>
where plus is the list concatenation.
 */

import {Fun} from "../lecture1/p1";
import {Pair, Unit} from "./L3p1";
import {cons, empty, List} from "../lecture2/L2p1";

export let zero_list = function<a>() : Fun<Unit, List<a>> {
    return Fun<Unit, List<a>>((_: Unit) => empty())
}

export let concat = function<a>(l1: List<a>, l2:List<a>): List<a> {
    if (l1.kind == "Empty") {
        return l2
    }
    else {
        let restConcat = concat(l1.tail, l2)
        return cons<a>(l1.head, restConcat)
    }
}

export let plus_list = function<a>() :Fun<Pair<List<a>,List<a>>,List<a>> {
    return Fun<Pair<List<a>,List<a>>,List<a>>( (p: Pair<List<a>,List<a>>) => concat(p.fst, p.snd))
}
