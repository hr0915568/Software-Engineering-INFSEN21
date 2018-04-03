/*
Extend the Option functor with the monoid operations for functors:

let unit: <a>() => Func<a, Option<a>>
let join: <a>() => Func<Option<Option<a>>, Option<a>>
 */


export type Option<a> = ({
    kind: "none"
} | {
    kind: "some",
    value: a
}) & {
    then: <b>(this: Option<a>, k: Fun<a, Option<b>>) => Option<b>
}

export let None = function<a>(): Option<a> {
    return {
        kind: "none",
        then: function<b>(this: Option<a>, k: Fun<a, Option<b>>): Option<b> {
            return map_Option(k).then(join_Option()).f(this)
        }
    }
}

export let Some = function<a>(content: a): Option<a> {
    return {
        kind: "some",
        value: content,
        then: function<b>(this: Option<a>, k: Fun<a, Option<b>>): Option<b> {
            return map_Option(k).then(join_Option()).f(this)
        }
    }
}

export let map_Option = function<a, b>(mapper: Fun<a, b>): Fun<Option<a>, Option<b>> {
    let g = (opt: Option<a>) => {
        if (opt.kind == "none") {
            return None<b>()
        }
        else {
            let newValue = mapper.f(opt.value)
            return Some<b>(newValue)
        }
    }
    return Fun<Option<a>, Option<b>>(g)
}

export let id = function<a>(): Fun<a, a> {
    return Fun<a, a>((x: a) => x)
}

//unit || return: a -> Option<a>
export let unit_Option = function<a>() : Fun<a, Option<a>> {
    let g = (x: a) => {
        return Some<a>(x)
    }
    return Fun<a, Option<a>>(g)
}

export let join_Option = function<a>(): Fun<Option<Option<a>>, Option<a>> {
    let g = (opt: Option<Option<a>>) => {
        if (opt.kind == "none") {
            return None<a>()
        }
        else {
            return opt.value
        }
    }
    return Fun<Option<Option<a>>, Option<a>>(g)
}