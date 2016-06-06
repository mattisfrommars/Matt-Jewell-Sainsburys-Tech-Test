import {getPageContents} from "../Http";
import {createFromDom as createProductListFromDom} from "../ProductList";
import DomParser from "../DomParser";

export default async function (config) {
    try {
        const httpData = await getPageContents(config.scrapeUrl);
        const httpDom = new DomParser(httpData.body);
        const productList = createProductListFromDom(httpDom);
        console.log("productList", productList);
        console.log("total price", totalPrice);
    } catch (e) {
        console.error(e);
    }
};