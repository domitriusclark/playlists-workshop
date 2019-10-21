require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./apollo/schema");
const resolvers = require("./apollo/resolvers");

/* 
    In here, we will be setting up how our app will  
    will handle passing our user into our resolvers with our 
    JWT token verification. 

    1. create a function that allow us to verify the token 
    2. set the Apollo Server's context by picking the header off and passing the token through
*/

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
