import {describe, it, beforeEach} from "mocha";
import assert from "assert";
import DOMParser from "../src/DOMParser";
import {STUB_HTML} from "./data/stubs";

// Just some happy path testing, I'm sure there's a million edge cases, but let's hope that cheerio handles them
describe("A Dom Parser", function () {
    describe("Given an instance of a dom parser", function () {
        var domParser;
        beforeEach(function () {
            domParser = new DOMParser(STUB_HTML);
        });

        describe("getting text content", function () {
            it("can get the text content of nodes", function () {
                var expected = ["one", "two", "three"];
                var actual = domParser.getNodesText([".item"])[0];
                dodyDeepEqual(actual, expected);
            });

            it("returns an empty array if no nodes can be found for a selector", function () {
                var expected = [];
                var actual = domParser.getNodesText([".doesntexist"])[0];
                dodyDeepEqual(actual, expected);
            });
        });

        describe("getting the property of an attribute", function () {
            it("can get attributes from items", function () {
                var expected = ["one.html", "two.html", "three.html"];
                var actual = domParser.getNodesAttr("href", [".item a"])[0];
                dodyDeepEqual(actual, expected);
            });

            it("returns an empty array if no nodes can be found for a selector", function () {
                var expected = [];
                var actual = domParser.getNodesAttr("href", [".doesntexist"])[0];
                dodyDeepEqual(actual, expected);
            });

            it("returns an array of empty strings if the attribute isnt set", function () {
                var expected = ["", "", ""];
                var actual = domParser.getNodesAttr("doesntexist", [".item a"])[0];
                dodyDeepEqual(actual, expected);
            });
        });
    });
});

function dodyDeepEqual (actual, expected) {
    assert.equal(actual.length, expected.length, "should return same number of items");
    // TODO: why doesn't assert.deepEqual work here
    expected.forEach(function (e, i) {
        assert.equal(actual[i], expected[i], "item at index " + i + " was not what was expected");
    });
}