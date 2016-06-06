import request from "request";

// async function which returns a promise for the contents of a HTTP page as a HttpDataStructure
function HttpPageGetter (pageUrl) {
    return new Promise(function (resolve, reject) {
        request(pageUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            resolve(body);
        });
    });
}

module.exports = HttpPageGetter;