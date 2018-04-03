/*
Define the Set functor. A set is a data structure containing non-repeated elements of type `a`. Implement the `map_Set` function to give it a functorial structure:

let map_Set = <a, b>(f: Fun<a, b>): Fun<Set<a>, Set<b>>
Extend the Set functor with unit and join to give it a monoidal structure

let unit_Set = <a>(): Fun<a, Set<a>>
let join_set = <a>(): Fun<Set<Set<a>>, Set<a>>
Extend the Set monoid with bind to give it a monadic structure

let bind = <a, b>(k: Fun<a, Set<b>>): Fun<Set<a>,Set<b>>
 */

//let map_Set = <a, b>(f: Fun<a, b>): Fun<Set<a>, Set<b>>

// what is a set functor? By the defintion above, can I use the identity Functor?