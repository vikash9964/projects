const graphql = require('graphql');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,    
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },       
        first_name: { type: GraphQLString } ,
        last_name: { type: GraphQLString } ,
        email: { type: GraphQLString } , 
        password: { type: GraphQLString } ,
        dob: { type: GraphQLString } ,
        avatar: { type: GraphQLString } ,
        createdAt: { type: GraphQLString } ,
        updatedAt: { type: GraphQLString } ,
        status: { type: GraphQLBoolean } ,      
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {        
        UserDeatails: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,    
});