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
let lijst = cons<string>('a', cons<string>('b', empty())); // list [a --> b --> empty] is a linked list!


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
console.log(res);


let encoderf2 = (s: string, p: number) :string => {
    return s.charAt(0) + p
}
// //generalization
// let encodeGeneralized = function<a, b, p>(f: (_: a, param: p) => b) : Fun<number, Fun<List<string>, List<string>>> {
//     let mapping = (l: List<a>) => {
//         if (l.kind == "Empty") {
//             return empty();
//         }
//         else {
//             let result = f(l.head)
//             return cons<b>(result, mapping(l.tail))
//         }
//     }
//
//     return Fun<number, Fun<List<string>, List<string>>>(mapping)
//
// }