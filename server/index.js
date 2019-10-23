require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./apollo/schema");
const resolvers = require("./apollo/resolvers");
const { prisma } = require("./prisma/generated/prisma-client");
const OmdbAPI = require("./apollo/datasources/omdb");

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    omdbAPI: new OmdbAPI()
  }),
  context: async ({ req }) => {
    const tokenWithBearer = (await req.headers.authorization) || "";
    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);

    return {
      user,
      prisma // the generated prisma client if you are using it
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
