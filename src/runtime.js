import emoji from "node-emoji"
import {getPageContents} from "./Http";
import {createFromHttpData as createDomFromHttp} from "./DomParser";
import ProductList, {createFromDom as createProductListFromDom} from "./ProductList";
import {createFromDom as createProductDetailFromDom} from "./ProductDetail";

export default async function (config) {
    try {
        console.log(emoji.emojify("Built succesfully, running with default config :rocket:"));
        console.log("Scraping data from " + config.scrapeUrl);
        const httpData = await getPageContents(config.scrapeUrl);
        console.log(emoji.emojify("Download initial HTML complete :boy:"));
        const httpDom = createDomFromHttp(httpData);
        const productList = createProductListFromDom(httpDom);
        // a good old for loop would probably be more efficient here (using awaits inside map probably blocks)
        // as it is, it's only for a small number of products, so this is fine
        // TODO: speed test and refactor if necessary
        const length = productList.length;
        let counter = 0;
        const productDetails = await Promise.all(productList.products.map(async function (product) {
            const httpData = await getPageContents(product.href);
            console.log("Downloaded page details " + ++counter + "/" + length);
            const httpDom = createDomFromHttp(httpData);
            return createProductDetailFromDom(product, httpDom, httpData);
        }));
        const productListWithDetails = new ProductList(productDetails);

        console.log(emoji.emojify("Everything downloaded and parsed ok! Outputting JSON :heart_eyes_cat:"));
        console.log("\n\n\n");
        console.log(productListWithDetails.toJSON());

    } catch (e) {
        console.error(emoji.emojify(":skull_and_crossbones:"));
        console.error(e);
        process.exit(1);
    }
};
