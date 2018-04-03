/*
Define strings in terms of the string monoid, characterized by:

let zero: Fun<unit,string>
let plus: Fun<Pair<string,string>,string>
 */

import {Fun} from "../lecture1/p1";

export interface Pair<a, b> {
    fst: a
    snd: b
}


export type Unit = {}
let zero = Fun<Unit, string>( (_ :Unit) =>  '')
let plus = Fun<Pair<string, string>, string>(
    (p: Pair<string, string>) => p.fst + p.snd
)