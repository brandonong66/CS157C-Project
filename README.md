# CS157C-team8
Tools and Technologies: Neo4J, simulating a graph database.

Backend notes:
* API built using apollo server
* API components:
  - Schema: composed of Type definitions.
    - It specifies the format of data objects (e.g. the type Person has 3 fields, id, name and age)
    - Also specifies format of operations (Query aka reads, Mutations aka writes/updates) that can be performed on these objects 
    - In this project, schemas are put into their own graphql file (e.g. person.graphql)
    - Each object gets their own graphql file, these are merged together in index.js using the the merge tools (require("@graphql-tools/merge))
  - Resolvers: A resolver specifies how to respond to a request, what data to return back. Like an endpoint function in a REST API
    - For each data object, as specified in its corresponding .graphql file, there is a resolver.js file for it (person.graphql -> personResolver.js)
    - For a given objectResolver.js, there are two types: Query & Mutation
    - To understand the general format of resolvers, refer to comments in personResolver.js
  - driver: connection to database
    - passed to each resolver through a context object
* apollo uses graphql querying language to get data from neo4j database
