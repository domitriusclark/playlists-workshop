const resolvers = {
  Query: {
    currentUser: (_, args, { prisma, user }) => {
      if (!user) {
        throw new Error("Not Authenticated! Please login/signup.");
      }

      return prisma.user({ id: user.id });
    },
  },
  Mutation: {
    // Playlist Mutations
    createPlaylist: async () => { },
    deletePlaylist: async () => { },
    // Authentication Mutations
    register: async (_, args, { prisma }) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);

      const newUser = await prisma.createUser({
        username: args.username,
        email: args.email,
        password: hashedPassword
      });

      return newUser;
    },
    login: async (_, args, { prisma }) => {
      const user = await prisma.user({
        email: args.email
      });

      if (!user) {
        throw new Error("Invalid Login");
      }

      const passwordMatch = await bcrypt.compare(args.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: args.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d"
        }
      );

      return {
        token,
        user
      };
    },
    logout: (_, args, context) => {
      return { message: "Logged out!" };
    },
  }
}

module.exports = resolvers;