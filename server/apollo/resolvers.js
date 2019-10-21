const resolvers = {
    Query: {
        /*
            We're going to want to add a way to query our current user
        */
    },
    Mutation: {
        /*
            We're going to need to build out a few resolvers to support our authentication flow. We will be tapping into methods created by prisma
            to deal with storing data and tapping into the mutations created from our datamodel. 
            
            1. register
            2. login
            3. logout
        */
        register: async () => { },
        login: async () => { },
        logouy: () => { }
    }
}

module.exports = resolvers;