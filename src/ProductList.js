import {createProduct} from "./structures";

export default class ProductList {
    constructor (products) {
        this.products = products;
    }

    // defer iterable to products
    get length () {
        return this.products.length;
    }

    [Symbol.iterator] () {
        let index = 0;
        return {
            next: () => {
                const value = this.products[index];
                const done = index >= this.products.length;
                index++;
                return {value, done};
            }
        };
    }

    // compute total price
    get totalPrice () {
        return this.products.reduce(function (total, currentProduct) {
            // floating point Math in JS is a joke
            const currentTotal = parseInt(total * 100, 10);
            const currentPriceInt = parseInt(currentProduct.unitPrice * 100, 10);
            const newTotalInt = currentTotal + currentPriceInt;
            return newTotalInt / 100;
        }, 0);
    }

    toJSON () {
        return {
            results: this.products.map(toJSON),
            total: this.totalPrice
        };
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

function toJSON (item) {
    return item.toJSON();
}