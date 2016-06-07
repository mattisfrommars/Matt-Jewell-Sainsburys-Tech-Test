import request from "request";
import {createHttpData} from "./structures";

// async function which returns a promise for the contents of a HTTP page as a HttpDataStructure or rejects with an Http error
export const getPageContents = function (pageUrl) {
    return new Promise(function (resolve, reject) {
        request(pageUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }

            const httpData = createHttpData({
                body: body,
                contentSize: calculateContentSize(response)
            });
            resolve(httpData);
        });
    });
};

// returns content size in KB from http response
function calculateContentSize (response) {
    const sizeBytes = response.headers['content-length'];
    return sizeBytes / 1000;
}