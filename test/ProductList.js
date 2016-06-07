import {describe, it, beforeEach} from "mocha";
import assert from "assert";
import {createProduct} from "../src/structures";
import {STUB_PRODUCT, STUB_PRODUCT_EXPECTED_JSON} from "./data/stubs";
import ProductList from "../src/ProductList";
import ProductDetail from "../src/ProductDetail";

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
    it("calculates the total price of the products in the list", function () {
        var expected = 12.5;
        var actual = productList.totalPrice;
        assert.equal(actual, expected);
    });

    describe("JSON format (integration test)", function () {
        it("outputs JSON in the expected format", function () {
            const productDetail = new ProductDetail(STUB_PRODUCT);
            console.log("typeof productDetail.toJSON", typeof productDetail.toJSON);
            const productList = new ProductList([productDetail]);
            const actual = productList.toJSON();
            const expected = STUB_PRODUCT_EXPECTED_JSON;
            assert.deepEqual(actual, expected);
        });
    });
});