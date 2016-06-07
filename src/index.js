import fs from "fs";
import path from "path";
import runtime from "./runtime";

// don't bother with try/catch here. Just let any errors propagate up to console
// read config from JSON
const configPath = path.join(__dirname, "../config/master.json");
const configString = fs.readFileSync(configPath, "utf-8");
const config = JSON.parse(configString);
// and apply it to the runtime
runtime(config);