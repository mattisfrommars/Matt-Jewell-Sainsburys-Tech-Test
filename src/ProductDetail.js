export default class ProductDetail {
    // nothing fancy about this, just save the properties we're passed
    constructor (properties) {
        Object.assign(this, properties);
    }

    toJSON () {
        // This gets picked up by the ProductList integration test
        return {
            title: this.title,
            size: this.contentSize.toFixed(2) + "KB",
            unit_price: this.unitPrice,
            description: this.description
        };
    }
}

// expose a factory method for fetching the description and binding it to an existing set of properties
const DESCRIPTION_TEXT = ".productText";
export const createFromDom = function (productListProduct, domParserInstance, httpData) {
    const description = domParserInstance.getNodesText([DESCRIPTION_TEXT])[0][0];
    // copy in any properties we already had, and add a description
    return new ProductDetail(Object.assign({
        description: description,
        contentSize: httpData.contentSize
    }, productListProduct));
};