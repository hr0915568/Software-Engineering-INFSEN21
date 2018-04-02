import {Fun} from "../lecture1/p1";

type Exception<a> = {
    kind: "Result"
    content: a
} | {
    kind: "Error"
    content: string
}

let error = function<a>(message: string) : Exception<a> {
    return {
        kind: "Error",
        content: message
    }
}

let result = function<a>(value: a) : Exception<a> {
    return {
        kind: "Result",
        content: value
    }
}

let map_exception = function<a, b>(f: (_: a) => b) : Fun<Exception<a>, Exception<b>> {
    let mapping = (exc: Exception<a>) => {
        if (exc.kind == "Error") {
            return error<b>(exc.content);
        }
        else {
            let r = f(exc.content)
            return result<b>(r)
        }
    }
    return Fun<Exception<a>, Exception<b>>(mapping)
}

export let id = function<a>(): Fun<a, a> {
    return Fun<a, a>((x: a) => x)
}

// check the identity map_F<a,a>(id<a>()) = id<F<a>>()
console.log('map_exception<number, number>(id<number>().f).f(result(1))');
console.log(map_exception<number, number>(id<number>().f).f(result(1)));
console.log('id<Exception<number>>().f(result(1))');
console.log(id<Exception<number>>().f(result(1)));