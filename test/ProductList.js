import {describe, it, beforeEach} from "mocha";
import assert from "assert";
import {createProduct} from "../src/structures";
import ProductList from "../src/ProductList";

describe("A Product List", function () {
    let productList;
    beforeEach(function () {
        const productOne = createProduct({
            title: "My First Product",
            href: "http://example.com",
            unitPrice: 5
        });
        const productTwo = createProduct({
            title: "My Second Product",
            href: "http://google.com",
            unitPrice: 7.5
        });
        productList = new ProductList([productOne, productTwo]);
    });
    it("implements iterable, to return products in order", function () {
        assert.equal(productList.length, 2);
        let titles = [];
        for (let product of productList) {
            titles.push(product.title);
        }
        assert.equal(titles[0], "My First Product");
        assert.equal(titles[1], "My Second Product");
    });
});