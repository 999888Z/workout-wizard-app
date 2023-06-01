const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers={
    Query:{
        me: async (parent, args, context) => {
     
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select("-__v -password")
               
              return userData;
            }
            throw new AuthenticationError("Not logged in");
          },
          users: async () => {
            return User.find().select("-__v -password")
          },
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select("-__v -password")
              
          },
    },
    Mutation:{
        login:async(parent,{email,password})=>{
            const user=await User.findOne({email})
            console.log("hi")
            if(!user){
                throw new AuthenticationError("no user")
            }
            const correctPwd=await user.isCorrectPassword(password)
            if(!correctPwd){
                
                throw new AuthenticationError("incorrect password")
            }
            const token=signToken(user)
            return {token,user}
            },
        adduser:async(parent,args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        }
        }
    }
module.exports=resolvers