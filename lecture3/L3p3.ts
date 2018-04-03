/*
Implement the identity functor Identity<a> and extend it with the monoid operations for functors:

let id: <a>() => Fun<a, Identity<a>>
let join: <a>() => Fun<Identity<Identity<a>>, Identity<a>>
 */
import {Fun} from "../lecture1/p1";

type Identity<a> = a;

let identity = function<a>(x: a) : Identity<a> {
    return  x;
}

let id = function<a>() : Fun<a, Identity<a>> {
    return Fun( (_ :a) => identity(_))
}

let join = function<a>() :Fun<Identity<Identity<a>>, Identity<a>> {
    return Fun<Identity<Identity<a>>, Identity<a>>( (x :Identity<Identity<a>>) =>  identity(x))

}