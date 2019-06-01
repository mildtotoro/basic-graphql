const { GraphQLServer } = require('graphql-yoga');
// import cloneDeep from 'lodash/cloneDeep';
const cloneDeep = require('lodash/cloneDeep');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => "This is the API of a Basic Graphql",
    feed: (root, args, context, info) => {
      return context.prisma.links()
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    // updateLink: (parent, args) => {
    //   let newLinks = cloneDeep(links);
    //   let result;
    //   links = newLinks.map((link) => {
    //     if(link.id === args.id) {
    //       link.url = args.url
    //       link.description = args.description

    //       result = link
    //     }
    //     return link
    //   });

    //   links = newLinks;

    //   return result;
    // },
    // deleteLink: (parent, args) => {
    //   const removeLink = links.find((link) => {
    //     return (link.id === args.id)
    //   })

    //   links = links.filter((link) => {
    //     return (link.id !== args.id)
    //   });

    //   return removeLink
    // }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
