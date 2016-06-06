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
                body: body
            });
            resolve(httpData);
        });
    });
};