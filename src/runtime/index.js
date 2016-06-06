import httpPageGetter from "../httpPageGetter";
import getTextContent from "../getNodesTextContent";

export default async function (config) {
    const httpData = await httpPageGetter(config.scrapeUrl);
    const textNodes = getTextContent(httpData, [".product h3 a"]);
    console.log(textNodes);
};
