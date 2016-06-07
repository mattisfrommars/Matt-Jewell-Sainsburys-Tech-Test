export const STUB_HTML = "<ul> \
    <li class=\"item\"><a href=\"one.html\">one</a></li> \
    <li class=\"item\"><a href=\"two.html\">two</a></li> \
    <li class=\"item\"><a href=\"three.html\">three</a></li> \
    </ul>";

export const STUB_PRODUCT = {
    description: "Gold Kiwi",
    contentSize: 39.485,
    title: "Sainsbury's Golden Kiwi x4",
    href: "http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/sainsburys-golden-kiwi--taste-the-difference-x4-685641-p-44.html",
    unitPrice: 1.8
};

export const STUB_PRODUCT_EXPECTED_JSON = {
    results: [
        {
            title: "Sainsbury's Golden Kiwi x4",
            size: "39.48KB",
            unit_price: 1.8,
            description: "Gold Kiwi"
        }
    ],
    total: 1.8
};