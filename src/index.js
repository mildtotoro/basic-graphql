const { GraphQLServer } = require('graphql-yoga');
// import cloneDeep from 'lodash/cloneDeep';
const cloneDeep = require('lodash/cloneDeep');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
}

//https://www.howtographql.com/graphql-js/6-authentication/
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => { 
    return {
      ...request,
      prisma ,
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
