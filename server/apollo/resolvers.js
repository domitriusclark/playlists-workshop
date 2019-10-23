const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    currentUser: (_, args, { prisma, user }) => {
      if (!user) {
        throw new Error("Not Authenticated! Please login/signup.");
      }

      return prisma.user({ id: user.id });
    },

    // OMDB API Query
    showOrMovieData: async (_, { title }, { dataSources }) => {
      return dataSources.omdbAPI.getMediaDetails(title);
    }
  },
  Mutation: {
    // User mutations
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

    // Playlist mutations
    createPlaylist: async (_, args, { prisma }) => {
      const playlist = prisma.createPlaylist({
        owner: {
          connect: {
            id: args.userId
          }
        },
        title: args.title
      });

      return playlist;
    },
    deletePlaylist: async (_, args, { prisma }) => {
      const deletePlaylist = await prisma.updateUser({
        data: { playlists: { delete: { id: args.playlistId } } },
        where: {
          id: args.userId
        }
      });

      return deletePlaylist;
    },

    // Media Mutations
    createMedia: async (_, args, { prisma }) => {
      // first we will loop the current media in the DB to see if one exists with the same title
      const mediaExists = await prisma
        .medias()
        .then(data => data.find(media => media.title === args.mediaTitle));

      // if the media does exist, we want to just pass that object so addMediaToPlaylist can consume it
      if (mediaExists instanceof Object) {
        return mediaExists;
      }

      const newMedia = prisma.createMedia({
        ...args.media
      });

      return newMedia;
    },
    addMediaToPlaylist: async (_, args, { prisma, user }) => {
      if (!user) {
        throw new Error("Log in first!");
      }

      // Let's check to make sure we're not duplicating media inside of the playlist
      const mediaExistsInPlaylist = await prisma
        .playlist({
          title: args.playlistTitle
        })
        .media()
        .then(data => data.some(media => media.title === args.mediaTitle));

      if (mediaExistsInPlaylist) {
        throw new Error("This media already exists in this playlist!");
      }

      // Update the playlist to add a media to the currently chosen playlist
      return prisma.updatePlaylist({
        data: {
          media: {
            connect: {
              id: args.mediaId
            }
          }
        },
        where: {
          title: args.playlistTitle
        }
      });
    }
  },

  // Type resolvers for relationships
  User: {
    playlists: (parent, args, { prisma }) => {
      return prisma.user({ id: parent.id }).playlists();
    }
  },
  Playlist: {
    owner: (parent, args, { prisma }) => {
      return prisma.playlist({ id: parent.id }).owner();
    },
    media: (parent, args, { prisma }) => {
      return prisma.playlist({ id: parent.id }).media();
    }
  }
};

module.exports = resolvers;
