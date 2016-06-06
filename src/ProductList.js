import {createProduct} from "./structures";

export default class ProductList {
    constructor (products) {
        this.products = products
    }
}

// export a factory function to create from scraped data
export const createFromDom = function (domParserInstance) {
    const textNodes = domParserInstance.getNodesText([PRODUCT_TITLE_LINK, PRODUCT_UNIT_PRICE]);
    const titles = textNodes[0];
    const unitPrices = textNodes[1].map(unitPriceToFloat);
    const hrefs = domParserInstance.getNodesAttr("href", [PRODUCT_TITLE_LINK]).shift();
    const products = titles.map(function (title, i) {
        return createProduct({
            title: title,
            href: hrefs[i],
            unitPrice: unitPrices[i]
        });
    });
    
    return new ProductList(products);
};

// private methods/properties

const PRODUCT_TITLE_LINK = ".product h3 a";
const PRODUCT_UNIT_PRICE = ".product .pricePerUnit";

function unitPriceToFloat (priceString) {
    return parseFloat(/\d.\d\d/.exec(priceString)[0]);
}