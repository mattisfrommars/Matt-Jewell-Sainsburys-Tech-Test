import {getPageContents} from "./Http";
import {createFromHttpData as createDomFromHttp} from "./DomParser";
import {createFromDom as createProductListFromDom} from "./ProductList";
import {createFromDom as createProductDetailFromDom} from "./ProductDetail";

export default async function (config) {
    try {
        const httpData = await getPageContents(config.scrapeUrl);
        const httpDom = createDomFromHttp(httpData);
        const productList = createProductListFromDom(httpDom);
        // a good old for loop would probably be more efficient here (using awaits inside map probably blocks)
        // as it is, it's only for a small number of products, so this is fine
        // TODO: speed test and refactor if necessary
        const productListWithDetails = await Promise.all(productList.products.map(async function (product) {
            const httpData = await getPageContents(product.href);
            const httpDom = createDomFromHttp(httpData);
            return createProductDetailFromDom(product, httpDom, httpData);
        }));
        console.log("productListWithDetails", productListWithDetails);
    } catch (e) {
        console.error(e);
    }
};