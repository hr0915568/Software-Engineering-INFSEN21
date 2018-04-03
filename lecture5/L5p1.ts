
type Option<a> = {
    kind: "none"
} | {
    kind: "some"
    value: a
}


let None = function<a>(): Option<a> { return { kind: "none" } }
let Some = function<a>(content: a): Option<a> {
    return {
        kind: "some",
        value: content
    }
}

interface ServerConnection {
    ip: string //ip address
    hello: string //hello message
}

let newConnection = function() : ServerConnection {
    return {
        ip: 'localhost',
        hello: 'hellow world'
    }
}

let connect = (ip: string): Option<ServerConnection>  => {
    if (Math.random() > 0.15) {
        return {
            kind: "some",
            value: {
                ip: ip,
                hello: 'hello'
            }
        }
    } else {
        return None<ServerConnection>();
    }
}

interface ServerContent {
    ip: string //ip address
    content: string //content message
}
// let get = (ip: string): Option<ServerContent> => {
//     //???
// }