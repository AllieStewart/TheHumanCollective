// Start of JS file
// Resolvers for models, through Query and Mutation definitions.
const { User, Log, Geolocation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('logs');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('logs');
        },
        logs: async (parent, { username }) => {
            const params = username ? { logAuthor: username } : {};
            return Log.find(params).sort({ createdAt: -1 });
        },
        log: async (parent, { logId }) => {
            return Log.findOne({ _id: logId });
        },
        geolocations: async () => {
            return Geolocation.find().sort({ createdAt: -1 });
        },
        geolocation: async (parent, { geoId }) => {
            return Geolocation.findOne({ _id: geoId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('logs');
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        addLog: async (parent, { logText, geolocation }, context) => {
            if (context.user) {
              const logData = {
                logText,
                logAuthor: context.user.username,
              };

              if (geolocation) {
                logData.geolocation = geolocation;
              }
              
              const log = await Log.create(logData);
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { logs: log._id } }
              );
              return log;
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { logId, commentText }, context) => {
            if (context.user) {
              return Log.findOneAndUpdate(
                { _id: logId },
                {
                  $addToSet: {
                    comments: { commentText, commentAuthor: context.user.username },
                  },
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
            }
            throw AuthenticationError;
        },
        addGeolocation: async (parent, { countryText, stateText, cityText, latitude, longitude, placeName }, context) => {
            if (context.user) {
              const geolocation = await Geolocation.create({
                countryText,
                stateText,
                cityText,
                latitude,
                longitude,
                placeName,
              });
              return geolocation;
            }
            throw AuthenticationError;
        },
        removeLog: async (parent, { logId }, context) => {
            if (context.user) {
              const log = await Log.findOneAndDelete({
                _id: logId,
                logAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { logs: log._id } }
              );
      
              return log;
            }
            throw AuthenticationError;
        },
        removeComment: async (parent, { logId, commentId }, context) => {
            if (context.user) {
              return Log.findOneAndUpdate(
                { _id: logId },
                {
                  $pull: {
                    comments: {
                      _id: commentId,
                      commentAuthor: context.user.username,
                    },
                  },
                },
                { new: true }
              );
            }
            throw AuthenticationError;
        },
    },
};

// searchHistory: async (parent, { logId }, context) => {}

module.exports = resolvers;
// End of JS file