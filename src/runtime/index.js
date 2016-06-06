import httpPageGetter from "../httpPageGetter";

export default async function (config) {
    const httpData = await httpPageGetter("http://www.google.com");
    console.log("Got the body!");
    console.log(httpData.body);
};
