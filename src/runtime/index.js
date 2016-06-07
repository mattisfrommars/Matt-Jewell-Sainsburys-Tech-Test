import {getPageContents} from "../Http";
import {createFromHttpData as createDomFromHttp} from "../DOMParser";
import {createFromDom as createProductListFromDom} from "../ProductList";

export default async function (config) {
    try {
        const httpData = await getPageContents(config.scrapeUrl);
        const httpDom = createDomFromHttp(httpData);
        const productList = createProductListFromDom(httpDom);
        console.log("productList", productList);
        console.log("total price", totalPrice);
    } catch (e) {
        console.error(e);
    }
};