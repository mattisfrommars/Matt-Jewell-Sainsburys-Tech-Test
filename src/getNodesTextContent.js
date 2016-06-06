import cheerio from "cheerio";

/**
 * gets the text content of css selectors from given httpData
 * @param httpData - instance of HttpDataStructure
 * @param selectors - an array of selectors
 * @returns {*[]} - the text content of the nodes (if found) for each selector
 *
 * e.g. given the following html
 *  <ul>
 *      <li class="item">one</li>
 *      <li class="item">two</li>
 *      <li class="item">three</li>
 *  </ul>
 *
 *  getNodesTextContent(httpData, [".item"]) =>
 *      [["one", "two", "three"]]
 */
export default function getNodesTextContent (httpData, selectors) {
    const $ = cheerio.load(httpData.body);
    return selectors.map(function (selector) {
        let results = [];
        $(selector).each(function (i) {
            results[i] = $(this).text().trim();
        });
        return results;
    });
}