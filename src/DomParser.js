import cheerio from "cheerio";

export default class DomParser {
    constructor (httpData) {
        this.$ = cheerio.load(httpData.body);
    }

    /**
     * gets the text content of css selectors from given httpData
     * @param selectors - an array of selectors
     * @returns {*[]} - the text content of the nodes (if found) for each selector
     *
     * e.g. given the following html
     *  <ul>
     *      <li class="item"><a href="one.html">one</a></li>
     *      <li class="item"><a href="two.html">two</a></li>
     *      <li class="item"><a href="three.html">three</a></li>
     *  </ul>
     *
     *  domParser.getNodesText([".item"]) =>
     *      [["one", "two", "three"]]
     *
     */
    getNodesText (selectors) {
        return mapSelectors(this.$, selectors, function ($this) {
            return $this.text().trim();
        });
    }

    /**
     * gets the attribute of a node
     * @param attrName
     * @param selectors
     * @returns {*[]} - the content of the dom attribute for each node
     *
     * e.g. given the same HTML as previous example:
     *
     * domParser.getNodesAttr("href". [".item a"]) =>
     *   [["one.html", "two.html", "three.html"]]
     */
    getNodesAttr (attrName, selectors) {
        return mapSelectors(this.$, selectors, function ($this) {
            return $this.attr(attrName).trim();
        });
    }
}

function mapSelectors ($, selectors, fn) {
    return selectors.map(function (selector) {
        let results = [];
        $(selector).each(function (i) {
            results[i] = fn($(this));
        });
        return results;
    });
}