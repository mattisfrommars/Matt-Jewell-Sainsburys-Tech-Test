import request from "request";
import createHttpDataStructure from "./structures/createHttpDataStructure";

// async function which returns a promise for the contents of a HTTP page as a HttpDataStructure or rejects with an Http error
function HttpPageGetter (pageUrl) {
    return new Promise(function (resolve, reject) {
        request(pageUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            const httpData = createHttpDataStructure({
                body: body
            });
            resolve(httpData);
        });
    });
}

export default HttpPageGetter;