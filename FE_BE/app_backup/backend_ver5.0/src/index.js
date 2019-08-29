const { ApolloServer } = require('apollo-server');
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const { createConnection } = require('typeorm');

const articleSchema = require('./schemas/Article');

const typeDefs = mergeTypes([
    articleSchema.typedef
], { all: true });

const resolvers = mergeResolvers([
    articleSchema.resolvers
]);

const server = new ApolloServer({
    typeDefs, resolvers
});

createConnection({

    'type': 'mysql',
    'host': 'localhost',
    'port': 3306,
    'username': 'root',
    'password': 'toor',
    'database': 'NEWSDB',
    'synchronize': true,
    'logging': false,
    'entities': [
        require('./entities/Article')

    ]
}).then(() => {
    server.listen().then(({ url }) => {
        console.log(`🚀  Backend Server ready at ${url} `);
    });
}).catch((err) => {
    console.log('Could nott connect to the database', err);
});
