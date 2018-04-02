import {Fun} from "../lecture1/p1";
/*
Implement a List Functor List<a> where its data structure is defined with a discriminate union made of Cons and Empty.
Cons contains a field head of type a for the first element in the list, and a field tail of type List<a>. Empty does not
 contain anything and marks only an empty list.
 */


/*
Define a List<string> of symbols (single characters) and apply a transformation encode to the symbol using map that adds
a constant number (shift) to the ASCII code of the character:

encode: Fun<List<string>, List<string>>
 */

/*
You can use charCodeAt(0) to get the integer number corresponding to the symbol and then add a constant value.

Generalize encode with the following type

encode: Fun<number, Fun<List<string>, List<string>>>
 */



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

//create a list of chars a, b
let lijst = cons<string>('a', cons<string>('b', empty()));


let encode = function<a, b>(f: (_: a) => b) : Fun<List<a>, List<b>> {
    let mapping = (l: List<a>) => {
        if (l.kind == "Empty") {
            return empty();
        }
        else {
            let result = f(l.head)
            return cons<b>(result, mapping(l.tail))
        }
    }

    return Fun<List<a>, List<b>>(mapping)

}

let encoderf = (s: string) :string => {
    return s.charAt(0) + 10
}

let res = encode(encoderf).f(lijst);
console.log(res );


let encoderf2 = (s: string, p: number) :string => {
    return s.charAt(0) + p
}