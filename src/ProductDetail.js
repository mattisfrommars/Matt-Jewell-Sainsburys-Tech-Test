export default class ProductDetail {
    // nothing fancy about this, just save the properties we're passed
    constructor (properties) {
        Object.assign(this, properties);
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