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
export default function defineStructure (structDefinition) {
    return function (structData) {
        const structuredData = structDefinition.reduce(function (dataObject, propertyName) {
            dataObject[propertyName] = structData[propertyName];
            return dataObject;
        }, {});
        return Object.freeze(structuredData);
    };
};