// Start of JS file
// Resolvers for models, through Query and Mutation definitions.
const { User, Log } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// Connect API(s) functions here

const resolvers = {
    Query: {
        // API function returned here
        users: async () => {
            return User.find().populate('logs');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('logs');
        },
        logs: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Log.find(params).sort({ createdAt: -1 });
          },
        log: async (parent, { logId }) => {
            return Log.findOne({ _id: logId });
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
        addLog: async (parent, { logText }, context) => {
            if (context.user) {
              const log = await Log.create({
                logText,
                logAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { logs: log._id } }
              );
      
              return log;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
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
          //searchHistory: async (parent, { }, context) => {

          //},
    },
};

module.exports = resolvers;
// End of JS file