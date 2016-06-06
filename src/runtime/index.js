import httpPageGetter from "../httpPageGetter";
import DomParser from "../DomParser";
import createProductStructure from "../structures/createProductStructure";

export default async function (config) {
    const httpData = await httpPageGetter(config.scrapeUrl);
    const domParser = new DomParser(httpData);
    const textNodes = domParser.getNodesText([".product h3 a", ".product .pricePerUnit"]);
    const titles = textNodes[0];
    const unitPrices = textNodes[1].map(unitPriceToFloat);
    const hrefs = domParser.getNodesAttr("href", [".product h3 a"]).shift();
    const products = titles.map(function (title, i) {
        return createProductStructure({
            title: title,
            href: hrefs[i],
            unitPrice: unitPrices[i]
        });
    });
    const totalPrice = products.reduce(function (total, product) {
        // JS floating point math is a joke
        const totalInt = parseInt(total * 100, 10);
        const unitPriceInt = parseInt(product.unitPrice * 100, 10);
        const totalPriceInt = totalInt + unitPriceInt;
        return totalPriceInt / 100;
    }, 0);
    console.log("products", products);
    console.log("total price", totalPrice);
};

function unitPriceToFloat (priceString) {
    return parseFloat(/\d.\d\d/.exec(priceString)[0]);
}
