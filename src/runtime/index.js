import createHttpDataStructure from "../structures/createHttpDataStructure";

export default async function (config) {
    const httpData = createHttpDataStructure({
        body: "Hello, world"
    });
    
    console.log("getting data", httpData.body);
    console.log(Object.keys(httpData));
};
