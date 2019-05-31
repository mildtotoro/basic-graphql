const { GraphQLServer } = require('graphql-yoga');
// import cloneDeep from 'lodash/cloneDeep';
const cloneDeep = require('lodash/cloneDeep');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = { 
  Query: {
    info: () => "Test",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }

      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      let newLinks = cloneDeep(links);
      let result;
      links = newLinks.map((link) => {
        if(link.id === args.id) {
          link.url = args.url
          link.description = args.description

          result = link
        }
        return link
      });

      links = newLinks;

      return result;
    },
    deleteLink: (parent, args) => {
      const removeLink = links.find((link) => {
        return (link.id === args.id)
      })

      links = links.filter((link) => {
        return (link.id !== args.id)
      });

      return removeLink
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
