/**
 * The different components of the application pass around structured data as instances
 * of one of the structures in this folder.
 *
 * They are exposed as factory functions (not classes)
 * which accept one argument params that defines the data that the
 * structure contains. Once the object is created, it should be
 * treated as immutable and the properties not be changed in any way.
 */

// all the data structures used in the app:
const httpData = [
    "body"
];
const product = [
    "title",
    "href",
    "unitPrice"
];

/**
 * @param structDefinition - Array of property names for the data structure
 *
 * a method to create structure objects, integral to data transfer within the app.
 *
 * a struct definition consists of an Array of property names
 *
 * e.g.
 *
 *  const foobarStructDefinition = defineStructure(["foo", "bar"]);
 *
 *  const fooBarInstance = foobarStructDefinition({
 *      foo: "Foo!",
 *      bar: "Bar!"
 *  });
 *
 *  // properties are exposed on the instance object, and are read only
 *  fooBarInstance.foo === "Foo!";
 *  fooBarInstance.foo = "a new value"; // Wont change anything, structs are immutable thanks to Object.freeze
 */
function defineStructure (structDefinition) {
    return function (structData) {
        const structuredData = structDefinition.reduce(function (dataObject, propertyName) {
            dataObject[propertyName] = structData[propertyName];
            return dataObject;
        }, {});
        return Object.freeze(structuredData);
    };
}
export const createHttpData = defineStructure(httpData);
export const createProduct = defineStructure(product);