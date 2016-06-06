# Data Structures

The different components of the application pass around structured data as instances of one of the structures in this folder.

They are exposed as factory functions (not classes) which accept one argument `params` that defines the data that the structure contains. Once the object is created, it should be treated as immutable and the properties not be changed in any way.