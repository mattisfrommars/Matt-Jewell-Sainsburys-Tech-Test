import DomParser from "../../src/DomParser";

export const STUB_HTML = "<ul> \
    <li class=\"item\"><a href=\"one.html\">one</a></li> \
    <li class=\"item\"><a href=\"two.html\">two</a></li> \
    <li class=\"item\"><a href=\"three.html\">three</a></li> \
    </ul>";

export const STUB_DOM_PARSER = new DomParser(STUB_HTML);