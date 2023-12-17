// Start of JS file
// Resolvers for models, through Query and Mutation definitions.const { User, Post } = require('../models');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('logs');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('logs');
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('logs');
            }
            throw AuthenticationError;
        },
        // logs, log, API function?
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
        // addLog, addComment, removeLog, removeComment?
    },
};

module.exports = resolvers;
// End of JS file