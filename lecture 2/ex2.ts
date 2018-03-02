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

type Exception<a> = {
    kind: "Result"
    content: a
} | {
    kind: "Error"
    content: string
}